import { beforeEach, describe, expect, it, vi } from "vitest";
import { penggajianApi } from "./penggajian-client";

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe("penggajianApi self-service methods", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("getRiwayatPenggajianSelf memanggil URL dengan query parameters yang benar", async () => {
		const mockEnvelope = { data: { content: [], totalElements: 0 } };
		fetchMock.mockResolvedValueOnce({
			ok: true,
			json: async () => mockEnvelope,
		});

		const result = await penggajianApi.getRiwayatPenggajianSelf({
			periode: "2026-06",
			page: 0,
			size: 10,
		});

		expect(fetchMock).toHaveBeenCalledWith("/api/proxy/penggajian/batch/master/self?periode=2026-06&page=0&size=10");
		expect(result).toEqual(mockEnvelope.data);
	});

	it("downloadSlipGaji mengembalikan blob PDF saat sukses", async () => {
		const mockBlob = new Blob(["pdf-content"], { type: "application/pdf" });
		fetchMock.mockResolvedValueOnce({
			ok: true,
			blob: async () => mockBlob,
		});

		const blob = await penggajianApi.downloadSlipGaji(123);
		expect(fetchMock).toHaveBeenCalledWith("/api/proxy/penggajian/batch/master/123/slip-gaji");
		expect(blob).toEqual(mockBlob);
	});

	it("downloadSlipGaji melempar error saat respons tidak ok", async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 404,
		});

		await expect(penggajianApi.downloadSlipGaji(999)).rejects.toThrow("Gagal mengunduh slip gaji (404)");
	});
});
