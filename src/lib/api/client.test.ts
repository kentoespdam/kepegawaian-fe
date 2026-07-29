import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, api } from "./client";

function mockFetch(data: unknown, ok = true, status = 200) {
	return vi.mocked(globalThis.fetch).mockResolvedValueOnce(
		new Response(JSON.stringify(ok ? { data } : { message: String(data) }), {
			status,
			statusText: ok ? "OK" : "Error",
			headers: { "Content-Type": "application/json" },
		}),
	);
}

describe("api.listBy — cascade profesi/jabatan", () => {
	beforeEach(() => {
		vi.spyOn(globalThis, "fetch");
	});

	it("memanggil fetch dengan URL yang benar: /api/proxy/master/{entity}/{key}/{id}", async () => {
		mockFetch([]);
		await api.listBy("profesi", "jabatan", "42");
		expect(globalThis.fetch).toHaveBeenCalledWith("/api/proxy/master/profesi/jabatan/42");
	});

	it("meng-unwrap envelope: mengembalikan data (bukan amplop penuh)", async () => {
		const profesi = [
			{ id: 31, nama: "Supervisor TI" },
			{ id: 32, nama: "Staf TI" },
		];
		mockFetch(profesi);
		const result = await api.listBy("profesi", "jabatan", "42");
		expect(result).toEqual(profesi);
	});

	it("meng-unwrap untuk berbagai entity cascade (jabatan/organisasi)", async () => {
		const jabatan = [
			{ id: 10, nama: "Kepala Bagian" },
			{ id: 11, nama: "Supervisor" },
		];
		mockFetch(jabatan);
		const result = await api.listBy("jabatan", "organisasi", "7");
		expect(result).toEqual(jabatan);
		expect(globalThis.fetch).toHaveBeenCalledWith("/api/proxy/master/jabatan/organisasi/7");
	});

	it("melempar ApiError saat response tidak ok", async () => {
		mockFetch("Gagal memuat", false, 500);
		await expect(api.listBy("profesi", "jabatan", "999")).rejects.toThrow(ApiError);
	});

	it("melempar ApiError dengan status yang benar", async () => {
		mockFetch("Not found", false, 404);
		await expect(api.listBy("profesi", "jabatan", "999")).rejects.toMatchObject({ status: 404 });
	});

	it("mengembalikan array kosong untuk profesi yang tidak punya jabatan", async () => {
		mockFetch([]);
		const result = await api.listBy("profesi", "jabatan", "0");
		expect(result).toEqual([]);
	});
});
