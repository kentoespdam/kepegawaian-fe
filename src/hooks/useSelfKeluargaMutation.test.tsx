// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSelfKeluargaMutation } from "./useSelfKeluargaMutation";

// ponytail: sonner dipakai di onSuccess — mock agar test fokus ke request
vi.mock("sonner", () => ({ toast: { success: vi.fn() } }));

function wrapper({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

/** NIK sesi (biodataId) — harus di-inject ke body, bukan dari form. */
const NIK = "3201010101";

describe("useSelfKeluargaMutation — request self-service /profil/keluarga", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		// cukup { ok: true } — selfProfilRequest hanya membaca body saat !res.ok
		global.fetch = vi.fn().mockResolvedValue({ ok: true });
	});

	it("update (PUT) mengirim Content-Type application/json — regresi 415 text/plain", async () => {
		const { result } = renderHook(() => useSelfKeluargaMutation(NIK), { wrapper });
		await result.current.update.mutateAsync({ id: 84, nama: "Siti" });

		const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe("/api/proxy/profil/keluarga/84");
		expect(init.method).toBe("PUT");
		expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
	});

	it("create (POST) mengirim Content-Type application/json + biodataId dari sesi", async () => {
		const { result } = renderHook(() => useSelfKeluargaMutation(NIK), { wrapper });
		await result.current.create.mutateAsync({ nama: "Siti" });

		const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe("/api/proxy/profil/keluarga");
		expect(init.method).toBe("POST");
		expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
		expect(JSON.parse(String(init.body))).toMatchObject({ biodataId: NIK, nama: "Siti" });
	});

	it("remove (DELETE) tetap jalan tanpa body", async () => {
		const { result } = renderHook(() => useSelfKeluargaMutation(NIK), { wrapper });
		await result.current.remove.mutateAsync(84);

		const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe("/api/proxy/profil/keluarga/84");
		expect(init.method).toBe("DELETE");
	});
});
