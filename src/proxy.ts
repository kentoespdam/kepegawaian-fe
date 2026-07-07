import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APPWRITE_URL = process.env.APPWRITE_URL ?? "";
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT_ID ?? "";
const BACKEND_URL = "http://192.168.1.211:8080";
const JWT_DURATION = 3600;
const REFRESH_BUFFER = 30;

const SESSION_COOKIE = `a_session_${APPWRITE_PROJECT}`;
const TOKEN_COOKIE = "token";

// ponytail: module-level Map for dedup, cleared after 5s
const mintCache = new Map<string, Promise<string>>();

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  // Route guard — page navigations
  if (!pathname.startsWith("/api/proxy")) {
    if (pathname === "/login") {
      return session ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
    }
    return session ? NextResponse.next() : NextResponse.redirect(new URL("/login", request.url));
  }

  // API proxy — forward to backend with Bearer
  try {
    // Forward Appwrite API calls (/api/proxy/v1/* → Appwrite)
    if (pathname.startsWith("/api/proxy/v1/")) {
      return forwardToAppwrite(request, session);
    }

    // Forward backend calls (/api/proxy/master/* etc. → Backend Spring Boot)
    const jwt = await resolveToken(request);
    if (!jwt) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return forwardToBackend(request, jwt);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// ponytail: rewrite instead of manual fetch — Next.js handles method/body/headers
function forwardToAppwrite(request: NextRequest, _session: string | undefined) {
  const url = new URL(
    request.nextUrl.pathname.replace("/api/proxy", "") + request.nextUrl.search,
    `https://${APPWRITE_URL}`,
  );
  const headers = new Headers(request.headers);
  headers.set("X-Appwrite-Project", APPWRITE_PROJECT);
  return NextResponse.rewrite(url, { request: { headers } });
}

function forwardToBackend(request: NextRequest, token: string) {
  const url = new URL(request.nextUrl.pathname.replace("/api/proxy", "") + request.nextUrl.search, BACKEND_URL);
  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${token}`);
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: JWT_DURATION,
    path: "/",
  });
  return response;
}

async function resolveToken(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  // Hot path: decode exp, no signature verify, zero network
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() / 1000 < payload.exp - REFRESH_BUFFER) {
        return token;
      }
    } catch {
      // corrupted token → fall through to cold path
    }
  }

  // Cold path: mint new JWT via Appwrite
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  // Dedup concurrent mints for same session
  let mint = mintCache.get(session);
  if (!mint) {
    mint = mintJWT(session);
    mintCache.set(session, mint);
    mint.catch(() => {}).then(() => setTimeout(() => mintCache.delete(session), 5000));
  }
  return mint;
}

async function mintJWT(session: string) {
  const res = await fetch(`https://${APPWRITE_URL}/v1/account/jwt`, {
    method: "POST",
    headers: {
      "X-Appwrite-Project": APPWRITE_PROJECT,
      "Content-Type": "application/json",
      Cookie: `${SESSION_COOKIE}=${session}`,
    },
  });
  if (!res.ok) throw new Error("Mint failed");
  const data = await res.json();
  return data.jwt;
}
