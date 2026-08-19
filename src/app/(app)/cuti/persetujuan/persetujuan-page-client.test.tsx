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
		if (s.includes("/cuti/approval") && s.includes("/99") && init?.method !== "POST") {
			return okJson({ content: [], totalElements: 0, totalPages: 0 });
		}
		if (s.includes("/cuti/approval") && init?.method === "POST") {
			postInit = init;
			return okJson({});
		}
		if (s.includes("/cuti/pengajuan/approval")) {
			listUrl = s;
			// CU-20: READ = sudah diproses, default/tidak ada = belum diproses
			const isRead = s.includes("readWriteStatus=READ");
			return okJson({
				content: [
					{
						id: 1,
						approvalLevel: 1,
						readWriteStatus: isRead ? "READ" : "WRITE",
						refCuti: {
							id: 99,
							nama: "Budi Santoso",
							nipam: "890300426",
							jenisCuti: { id: 1, nama: "Cuti Tahunan" },
							tanggalMulai: "2026-08-01",
							tanggalSelesai: "2026-08-03",
							jumlahHariKerja: 2,
							approvalCutiStatus: isRead ? "APPROVED" : "PENDING",
							alasan: "Libur keluarga",
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
							approvalCutiStatus: isRead ? "REJECTED" : "PENDING",
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

function renderClient(searchParams?: Record<string, string>) {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	if (searchParams) {
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(searchParams) as ReturnType<typeof useSearchParams>);
	}
	return render(
		<QueryClientProvider client={qc}>
			<PersetujuanPageClient pegawaiId={7} jabatanId={7} />
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

	it("default view: kirim readWriteStatus=WRITE (tidak kirim param jika default)", async () => {
		mockFetch();
		renderClient();

		const detailButtons = await screen.findAllByRole("button", { name: /detail/i }, { timeout: 2000 });
		expect(detailButtons).toHaveLength(2);

		// CU-20: default = WRITE, backend menerima tanpa param readWriteStatus
		expect(listUrl).toContain("picSaatIniId=7");
		expect(listUrl).not.toContain("readWriteStatus");
	});

	it("readWriteStatus=READ: kirim param ke backend", async () => {
		mockFetch();
		renderClient({ readWriteStatus: "READ" });

		const detailButtons = await screen.findAllByRole("button", { name: /detail/i }, { timeout: 2000 });
		expect(detailButtons.length).toBeGreaterThan(0);

		expect(listUrl).toContain("readWriteStatus=READ");
		expect(listUrl).toContain("picSaatIniId=7");
	});

	it("approve flow: klik Detail → dialog → setujui → POST", async () => {
		mockFetch();
		renderClient();

		const detailButtons = await screen.findAllByRole("button", { name: /detail/i }, { timeout: 2000 });
		await userEvent.click(detailButtons[0]);

		const dialog = await screen.findByRole("dialog", {}, { timeout: 2000 });
		expect(within(dialog).getByText("Detail Pengajuan Cuti")).toBeTruthy();
		expect(within(dialog).getByText("Budi Santoso")).toBeTruthy();

		const textarea = within(dialog).getByRole("textbox");
		await userEvent.type(textarea, "Disetujui, kuota tersedia");
		await userEvent.click(within(dialog).getByRole("button", { name: /setujui/i }));

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
