// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PengajuanPageClient } from "./pengajuan-page-client";

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

// CU-22–CU-33: mock data dengan混合 PENGAJUAN_CUTI + KLAIM_CUTI
const MOCK_PENGAJUAN = {
	id: 1,
	jenisPengajuanCuti: "PENGAJUAN_CUTI",
	jenisCuti: { id: 1, nama: "Cuti Tahunan" },
	tanggalMulai: "2026-08-01",
	tanggalSelesai: "2026-08-05",
	jumlahHariKerja: 4,
	approvalCutiStatus: "APPROVED",
	isClaimed: false,
};

const MOCK_KLAIM = {
	id: 2,
	jenisPengajuanCuti: "KLAIM_CUTI",
	jenisCuti: { id: 1, nama: "Cuti Tahunan" },
	tanggalMulai: "2026-08-01",
	tanggalSelesai: "2026-08-03",
	jumlahHariKerja: 3,
	approvalCutiStatus: "PENDING",
	isClaimed: false,
};

const MOCK_APPROVED_CLAIMED = {
	id: 3,
	jenisPengajuanCuti: "PENGAJUAN_CUTI",
	jenisCuti: { id: 1, nama: "Cuti Tahunan" },
	tanggalMulai: "2026-07-01",
	tanggalSelesai: "2026-07-05",
	jumlahHariKerja: 4,
	approvalCutiStatus: "APPROVED",
	isClaimed: true,
};

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/cuti/pengajuan/9/pegawai")) {
			const all = [MOCK_PENGAJUAN, MOCK_KLAIM, MOCK_APPROVED_CLAIMED];
			return okJson({
				content: all,
				totalElements: all.length,
				totalPages: 1,
				size: 10,
				number: 0,
				first: true,
				last: true,
			});
		}
		if (s.includes("/cuti/kuota")) return okJson({ page: { content: [] } });
		return okJson([]);
	});
}

function renderClient(params?: Record<string, string>) {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	const sp = new URLSearchParams(params);
	vi.mocked(useSearchParams).mockReturnValue(sp as ReturnType<typeof useSearchParams>);
	return render(
		<QueryClientProvider client={qc}>
			<PengajuanPageClient pegawaiId={9} nama="Budi" nipam="19800101" jabatan="Staf" />
		</QueryClientProvider>,
	);
}

describe("Klaim Cuti — Badge & Filter (CU-29, CU-31)", () => {
	beforeEach(() => {
		cleanup();
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
		vi.mocked(useRouter).mockReturnValue({ replace: vi.fn(), push: vi.fn() } as unknown as ReturnType<
			typeof useRouter
		>);
	});

	it("badge PENGAJUAN dan KLAIM ditampilkan sesuai jenisPengajuanCuti", async () => {
		mockFetch();
		renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Cuti Tahunan").length).toBe(3);
		});

		// CU-29: badge should show PENGAJUAN and KLAIM
		expect(screen.getAllByText("PENGAJUAN").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("KLAIM").length).toBeGreaterThanOrEqual(1);
	});

	it("filter dropdown jenisPengajuanCuti ada di toolbar", async () => {
		mockFetch();
		renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Cuti Tahunan").length).toBe(3);
		});

		// CU-31: filter dropdown harus ada
		expect(screen.getByLabelText("Jenis Pengajuan")).toBeTruthy();
	});

	it("tombol Klaim muncul untuk row APPROVED + !isClaimed + PENGAJUAN_CUTI", async () => {
		mockFetch();
		renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Cuti Tahunan").length).toBe(3);
		});

		// CU-24: tombol Klaim hanya untuk APPROVED + !isClaimed + PENGAJUAN_CUTI
		const klaimBtns = screen.getAllByRole("button", { name: /klaim/i });
		expect(klaimBtns.length).toBeGreaterThanOrEqual(1);
	});

	it("tombol Klaim TIDAK muncul untuk row isClaimed=true (CU-30)", async () => {
		mockFetch();
		renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Cuti Tahunan").length).toBe(3);
		});

		// MOCK_APPROVED_CLAIMED (id=3) has isClaimed=true → no Klaim button
		// MOCK_PENGAJUAN (id=1) has isClaimed=false + APPROVED → 1 Klaim button
		const klaimBtns = screen.getAllByRole("button", { name: /klaim/i });
		expect(klaimBtns).toHaveLength(1);
	});

	it("tombol Klaim TIDAK muncul untuk row KLAIM_CUTI (CU-24)", async () => {
		mockFetch();
		renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Cuti Tahunan").length).toBe(3);
		});

		// MOCK_KLAIM (id=2) has jenisPengajuanCuti=KLAIM_CUTI → no Klaim button
		// Only MOCK_PENGAJUAN (id=1) qualifies → 1 Klaim button
		const klaimBtns = screen.getAllByRole("button", { name: /klaim/i });
		expect(klaimBtns).toHaveLength(1);
	});
});
