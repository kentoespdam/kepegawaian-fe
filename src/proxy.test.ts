import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import proxy from "./proxy";

// env fixed by vitest.config.ts: APPWRITE_PROJECT_ID=proj123, APPWRITE_URL=http://appwrite.test
const SESSION_COOKIE = "a_session_proj123";

function req(path: string, cookie?: string) {
	return new NextRequest(`http://localhost:3000${path}`, {
		headers: cookie ? { cookie } : {},
	});
}

describe("proxy page guard", () => {
	afterEach(() => vi.unstubAllGlobals());

	it("serves /login when no session cookie is present", async () => {
		const res = await proxy(req("/login"));
		expect(res.status).toBe(200);
		expect(res.headers.get("location")).toBeNull();
	});

	it("redirects /login → / when the session is valid", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ $id: "u1" }), { status: 200 })));

		const res = await proxy(req("/login", `${SESSION_COOKIE}=valid-session`));

		expect(res.status).toBe(307);
		expect(res.headers.get("location")).toBe("http://localhost:3000/");
	});

	it("serves /login (no redirect) when the session cookie is stale — no redirect loop", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("invalid", { status: 401 })));

		const res = await proxy(req("/login", `${SESSION_COOKIE}=stale-session`));

		expect(res.status).toBe(200);
		expect(res.headers.get("location")).toBeNull();
	});

	it("redirects protected routes to /login when no session", async () => {
		const res = await proxy(req("/penggajian/verifikasi"));
		expect(res.status).toBe(307);
		expect(res.headers.get("location")).toBe("http://localhost:3000/login");
	});

	it("allows protected routes when a session cookie is present", async () => {
		const res = await proxy(req("/penggajian/verifikasi", `${SESSION_COOKIE}=valid-session`));
		expect(res.status).toBe(200);
	});
});