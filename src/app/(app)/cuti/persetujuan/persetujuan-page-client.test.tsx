// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PersetujuanPageClient } from "./persetujuan-page-client";

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

let postInit: RequestInit | null = null;

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

function renderClient() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<PersetujuanPageClient pegawaiId={7} />
		</QueryClientProvider>,
	);
}

describe("PersetujuanPageClient", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
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
});
