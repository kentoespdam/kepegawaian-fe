import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchAccount,
  mintJWT,
  readSession,
  sessionCookieNames,
  TOKEN_COOKIE,
  tokenCookieOptions,
} from "./appwriteSession";

// env fixed by vitest.config.ts: APPWRITE_PROJECT_ID=proj123, APPWRITE_URL=http://appwrite.test
const PRIMARY = "a_session_proj123";
const LEGACY = "a_session_proj123_legacy";

/** A cookie jar as a plain Map, matching the `(name) => value | undefined` lookup seam. */
function jar(entries: Record<string, string>) {
  const map = new Map(Object.entries(entries));
  return (name: string) => map.get(name);
}

describe("sessionCookieNames", () => {
  it("returns primary then _legacy fallback, in that order", () => {
    expect(sessionCookieNames()).toEqual([PRIMARY, LEGACY]);
  });
});

describe("readSession", () => {
  it("reads the primary cookie when present", () => {
    expect(readSession(jar({ [PRIMARY]: "primary-val" }))).toBe("primary-val");
  });

  it("falls back to _legacy when the primary is missing (the HTTP login-bounce bug)", () => {
    expect(readSession(jar({ [LEGACY]: "legacy-val" }))).toBe("legacy-val");
  });

  it("prefers primary over _legacy when both exist", () => {
    expect(readSession(jar({ [PRIMARY]: "primary-val", [LEGACY]: "legacy-val" }))).toBe("primary-val");
  });

  it("returns undefined when neither cookie is present", () => {
    expect(readSession(jar({ unrelated: "x" }))).toBeUndefined();
  });
});

describe("tokenCookieOptions", () => {
  const original = process.env.NODE_ENV;
  afterEach(() => {
    vi.stubEnv("NODE_ENV", original ?? "test");
    vi.unstubAllEnvs();
  });

  it("is not secure outside production (dev serves plain HTTP)", () => {
    vi.stubEnv("NODE_ENV", "development");
    const opts = tokenCookieOptions();
    expect(opts.secure).toBe(false);
    expect(opts).toMatchObject({ httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 });
  });

  it("is secure in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(tokenCookieOptions().secure).toBe(true);
  });

  it("names the token cookie 'token'", () => {
    expect(TOKEN_COOKIE).toBe("token");
  });
});

describe("fetchAccount", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("calls GET /v1/account with project header and forwarded session cookie", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ $id: "u1", email: "a@b.c", name: "A", labels: ["admin"] }), {
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const user = await fetchAccount("sess-xyz");

    expect(user).toEqual({ $id: "u1", email: "a@b.c", name: "A", labels: ["admin"] });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://appwrite.test/v1/account");
    const headers = init.headers as Headers;
    expect(headers.get("X-Appwrite-Project")).toBe("proj123");
    expect(headers.get("Cookie")).toBe(`${PRIMARY}=sess-xyz`);
  });

  it("throws when Appwrite responds non-OK", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 401 })));
    await expect(fetchAccount("bad")).rejects.toThrow("Account fetch failed");
  });
});

describe("mintJWT", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("POSTs /v1/account/jwt and returns the minted jwt", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ jwt: "minted-jwt" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const jwt = await mintJWT("sess-1");

    expect(jwt).toBe("minted-jwt");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://appwrite.test/v1/account/jwt");
    expect(init.method).toBe("POST");
  });

  it("dedups concurrent mints for the same session (one network call)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ jwt: "shared" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const [a, b] = await Promise.all([mintJWT("sess-dup"), mintJWT("sess-dup")]);

    expect(a).toBe("shared");
    expect(b).toBe("shared");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws when the mint call fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("err", { status: 500 })));
    await expect(mintJWT("sess-err")).rejects.toThrow("Mint failed");
  });
});
