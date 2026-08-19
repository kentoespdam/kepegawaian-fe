// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PersetujuanPageClient } from "./persetujuan-page-client";

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	usePathname: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

let postInit: RequestInit | null = null;
let listUrl: string | null = null;

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/auth/csrf-token")) return okJson("TOKEN-APPROVE");
		if (s.includes("/cuti/approval") && init?.method === "POST") {
			postInit = init;
			return okJson({});
		}
		if (s.includes("/cuti/pengajuan/approval")) {
			listUrl = s;
			// satu WRITE + satu NONE (non-approver lihat tanpa tombol)
			return okJson({
				content: [
					{
						id: 1,
						approvalLevel: 1,
						readWriteStatus: "WRITE",
						refCuti: {
							id: 99,
							nama: "Budi Santoso",
							jenisCuti: { id: 1, nama: "Cuti Tahunan" },
							tanggalMulai: "2026-08-01",
							tanggalSelesai: "2026-08-03",
							jumlahHariKerja: 2,
							approvalCutiStatus: "PENDING",
						},
					},
					{
						id: 2,
						approvalLevel: 1,
						readWriteStatus: "NONE",
						refCuti: {
							id: 100,
							nama: "Siti Aminah",
							jenisCuti: { id: 2, nama: "Cuti Sakit" },
							tanggalMulai: "2026-07-01",
							tanggalSelesai: "2026-07-02",
							jumlahHariKerja: 1,
							approvalCutiStatus: "PENDING",
						},
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
		return okJson([]);
	});
}

function renderClient(view: "menunggu" | "riwayat" = "menunggu") {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<PersetujuanPageClient view={view} pegawaiId={7} jabatanId={7} />
		</QueryClientProvider>,
	);
}

describe("PersetujuanPageClient", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		listUrl = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
		vi.mocked(usePathname).mockReturnValue("/cuti/persetujuan");
		vi.mocked(useRouter).mockReturnValue({ replace: vi.fn(), push: vi.fn() } as unknown as ReturnType<
			typeof useRouter
		>);
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
	});

	it("tombol Setujui/Tolak hanya untuk readWriteStatus WRITE; POST kirim body approval yang benar", async () => {
		mockFetch();
		renderClient();

		// hanya row WRITE (Budi) yang punya tombol aksi — NONE (Siti) tanpa tombol
		expect(await screen.findAllByRole("button", { name: /setujui/i }, { timeout: 2000 })).toHaveLength(1);

		// CU-18/ADR-0041: list di-filter posisional by JABATAN — picSaatIniId = jabatanId approver
		expect(listUrl).toContain("picSaatIniId=7");
		expect(listUrl).toContain("approvalCutiStatus=PENDING");

		await userEvent.click(screen.getByRole("button", { name: /setujui/i }));

		// notes wajib — tombol konfirmasi disabled sampai diisi
		const confirmButton = screen.getByRole("button", { name: /^setujui$/i });
		expect(confirmButton).toBeDisabled();
		const dialog = screen.getByRole("alertdialog");
		await userEvent.type(within(dialog).getByRole("textbox"), "Disetujui, kuota tersedia");
		await userEvent.click(confirmButton);

		await waitFor(() => expect(postInit).not.toBeNull());
		const body = JSON.parse(String(postInit?.body));
		expect(body.csrfToken).toBe("TOKEN-APPROVE");
		expect(body.cutiId).toBe(99);
		expect(body.approverId).toBe(7);
		expect(body.approvalLevel).toBe(1);
		expect(body.approvalStatus).toBe("APPROVED");
		expect(body.notes).toBe("Disetujui, kuota tersedia");
	});

	it("view riwayat: tanpa tab, tanpa tombol aksi, dan query list tidak kirim approvalCutiStatus", async () => {
		mockFetch();
		renderClient("riwayat");

		// data mock 2 baris PENDING → di-filter client → empty state riwayat
		expect(await screen.findByText("Belum ada riwayat persetujuan", {}, { timeout: 2000 })).toBeTruthy();
		expect(screen.queryByRole("button", { name: /setujui/i })).toBeNull();
		// Spike CU-10: riwayat tanpa filter status (backend 1 nilai) → non-PENDING di-filter client
		expect(listUrl).not.toContain("approvalCutiStatus");
		expect(listUrl).toContain("picSaatIniId=7");
	});
});
