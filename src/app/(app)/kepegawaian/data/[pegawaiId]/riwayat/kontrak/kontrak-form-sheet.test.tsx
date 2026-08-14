// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KontrakFormSheet } from "./kontrak-form-sheet";

// cmdk (dipakai FKCombobox) butuh ResizeObserver — polyfill untuk jsdom
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
if (!globalThis.ResizeObserver)
	(globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = ResizeObserverMock;
// cmdk juga memanggil scrollIntoView pada item list
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? (() => {});

/** Helper: buat Response sukses dengan envelope { data: ... }. */
function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

let postBody: string | null = null;

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/kepegawaian/riwayat/kontrak") && init?.method === "POST") {
			postBody = String(init?.body ?? "");
			return okJson({});
		}
		// opsi golongan — satu opsi agar bisa dipilih via combobox
		if (s.includes("/master/golongan")) {
			return okJson([{ id: 12, golongan: "C.4", pangkat: "Staf Tk.I" }]);
		}
		return okJson([]);
	});
}

function renderSheet() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<KontrakFormSheet pegawaiId="4" editingId={null} isOpen onClose={vi.fn()} />
		</QueryClientProvider>,
	);
}

/** Pilih tanggal di popover kalender yang sedang terbuka (hari ini — selalu ada di bulan berjalan). */
async function pickTodayInOpenPopover() {
	const today = new Date();
	const dataDay = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
	const day = document.querySelector(`[data-day="${dataDay}"]`);
	if (!day) throw new Error(`Day button ${dataDay} not found in open calendar`);
	await userEvent.click(day as HTMLElement);
}

async function pickDateByLabel(label: string) {
	const field = screen.getByText(label).closest("div") as HTMLElement;
	await userEvent.click(within(field).getByText("Pilih tanggal"));
	await pickTodayInOpenPopover();
}

// ── Tests ──

describe("KontrakFormSheet", () => {
	beforeEach(() => {
		cleanup();
		postBody = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("PERPANJANGAN (bukan PENGANGKATAN): golonganId TETAP dikirim + isLatest boolean — server 400 kalau golonganId dihilangkan", async () => {
		mockFetch();
		renderSheet();

		// Jenis Aksi = Perpanjangan (kasus lama: golongan disembunyikan → 400 "Golongan ID is required")
		await userEvent.click(screen.getAllByRole("combobox")[0]);
		await userEvent.click(await screen.findByRole("option", { name: "Perpanjangan Kontrak" }));

		// textbox order: nipam, nama, nomorKontrak, gajiPokok, notes(textarea)
		await userEvent.type(screen.getAllByRole("textbox")[0], "710100239");
		await userEvent.type(screen.getAllByRole("textbox")[1], "WACHJONO");
		await userEvent.type(screen.getAllByRole("textbox")[2], "K-2026-001");
		await pickDateByLabel("Tgl. SK");
		await pickDateByLabel("Mulai");

		// Golongan — wajib dipilih (field kini selalu tampil)
		await userEvent.click(screen.getAllByRole("combobox")[1]);
		await userEvent.click(await screen.findByRole("option", { name: /C\.4/ }));

		await userEvent.click(screen.getByRole("button", { name: /simpan/i }));

		expect(postBody).not.toBeNull();
		const sent = JSON.parse(postBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				pegawaiId: 4,
				jenisKontrak: "PERPANJANGAN",
				nomorKontrak: "K-2026-001",
				golonganId: 12,
				isLatest: false,
			}),
		);
	});
});
