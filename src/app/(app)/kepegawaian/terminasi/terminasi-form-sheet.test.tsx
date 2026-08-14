// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TerminasiFormSheet } from "./terminasi-form-sheet";

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

let postInit: RequestInit | null = null;

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/kepegawaian/riwayat/terminasi") && init?.method === "POST") {
			postInit = init;
			return okJson({});
		}
		if (s.includes("/master/alasan-berhenti")) {
			return okJson([{ id: 1, nama: "Pensiun Normal" }]);
		}
		if (s.includes("/pegawai/list")) {
			return okJson([
				{
					id: 101,
					nipam: "19800101",
					nama: "Budi Santoso",
					organisasi: { id: 5, nama: "Bagian Keuangan" },
					jabatan: { id: 12, nama: "Kepala Bagian Keuangan" },
					golongan: { id: 7 },
				},
			]);
		}
		return okJson([]);
	});
}

function renderSheet() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<TerminasiFormSheet isOpen onClose={vi.fn()} />
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

describe("TerminasiFormSheet", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("POST dikirim sebagai multipart FormData (bukan JSON → 415): jenisSk hardcode SK_PENSIUN, tanpa Content-Type manual, tanpa part fileName bila tidak ada file", async () => {
		mockFetch();
		renderSheet();

		// Pilih pegawai via picker (search minimal 2 karakter, debounce 300ms)
		await userEvent.click(screen.getByRole("button", { name: /cari pegawai aktif/i }));
		await userEvent.type(screen.getByRole("searchbox"), "Budi");
		await userEvent.click(await screen.findByText("Budi Santoso", undefined, { timeout: 2000 }));

		// Alasan terminasi dari backend
		await userEvent.click(screen.getByRole("combobox"));
		await userEvent.click(await screen.findByRole("option", { name: "Pensiun Normal" }));

		// Nomor SK
		const nomorSkField = screen.getByText("Nomor SK").closest("div") as HTMLElement;
		await userEvent.type(within(nomorSkField).getByRole("textbox"), "SK/2026/PSN/001");

		await pickDateByLabel("Tgl. SK");
		await pickDateByLabel("TMT Berlaku");

		await userEvent.click(screen.getByRole("button", { name: /simpan terminasi/i }));

		await waitFor(() => expect(postInit).not.toBeNull());
		const fd = postInit?.body as FormData;
		expect(fd).toBeInstanceOf(FormData);
		expect(postInit?.headers).toBeUndefined(); // browser auto-set boundary multipart
		expect(fd.get("jenisSk")).toBe("SK_PENSIUN");
		expect(fd.get("pegawaiId")).toBe("101");
		expect(fd.get("nipam")).toBe("19800101");
		expect(fd.get("nama")).toBe("Budi Santoso");
		expect(fd.get("organisasiId")).toBe("5");
		expect(fd.get("jabatanId")).toBe("12");
		expect(fd.get("alasanTerminasiId")).toBe("1");
		expect(fd.get("nomorSk")).toBe("SK/2026/PSN/001");
		expect(fd.get("tanggalSk")).not.toBeNull();
		expect(fd.get("tmtBerlaku")).not.toBeNull();
		expect(fd.get("fileName")).toBeNull(); // tanpa file → part tidak dikirim
	});
});
