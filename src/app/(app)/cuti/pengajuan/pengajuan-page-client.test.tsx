// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PengajuanPageClient } from "./pengajuan-page-client";

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

let deleteInit: { url: string; init?: RequestInit } | null = null;

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/cuti/pengajuan") && init?.method === "DELETE") {
			deleteInit = { url: s, init };
			return okJson({});
		}
		// daftar pengajuan — satu PENDING + satu APPROVED
		if (s.includes("/cuti/pengajuan/9/pegawai")) {
			return okJson({
				content: [
					{
						id: 1,
						jenisCuti: { id: 1, nama: "Cuti Tahunan" },
						tanggalMulai: "2026-08-01",
						tanggalSelesai: "2026-08-03",
						jumlahHariKerja: 2,
						approvalCutiStatus: "PENDING",
					},
					{
						id: 2,
						jenisCuti: { id: 2, nama: "Cuti Sakit" },
						tanggalMulai: "2026-07-01",
						tanggalSelesai: "2026-07-02",
						jumlahHariKerja: 1,
						approvalCutiStatus: "APPROVED",
					},
				],
				totalElements: 2,
				totalPages: 1,
				size: 10,
				number: 0,
				first: true,
				last: true,
			});
		}
		// kuota strip
		if (s.includes("/cuti/kuota")) {
			return okJson({ page: { content: [] } });
		}
		return okJson([]);
	});
}

function renderClient() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<PengajuanPageClient pegawaiId={9} nama="Budi Santoso" nipam="19800101" jabatan="Staf" />
		</QueryClientProvider>,
	);
}

describe("PengajuanPageClient", () => {
	beforeEach(() => {
		cleanup();
		deleteInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
		vi.mocked(useRouter).mockReturnValue({ replace: vi.fn(), push: vi.fn() } as unknown as ReturnType<
			typeof useRouter
		>);
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
	});

	it("tombol Batalkan hanya muncul untuk status PENDING dan DELETE mengirim id yang benar", async () => {
		mockFetch();
		renderClient();

		// row PENDING → tombol Batalkan; row APPROVED → tanpa tombol
		expect(await screen.findAllByRole("button", { name: /batalkan/i }, { timeout: 2000 })).toHaveLength(1);

		await userEvent.click(screen.getByRole("button", { name: /batalkan/i }));
		await userEvent.click(screen.getByRole("button", { name: /ya, batalkan/i }));

		await waitFor(() => expect(deleteInit).not.toBeNull());
		expect(deleteInit?.url).toContain("/cuti/pengajuan/1");
		expect(deleteInit?.init?.method).toBe("DELETE");
	});
});
