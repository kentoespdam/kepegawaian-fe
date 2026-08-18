// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PengajuanFormSheet } from "./pengajuan-form-sheet";

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
if (!globalThis.ResizeObserver)
	(globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = ResizeObserverMock;
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? (() => {});

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
		if (s.includes("/auth/csrf-token")) return okJson("TOKEN-XYZ");
		if (s.includes("/cuti/pengajuan") && init?.method) {
			postInit = init;
			return okJson({});
		}
		if (s.includes("/cuti/jenis/list") && s.includes("parentId")) {
			return okJson([{ id: 11, nama: "Ibadah Haji" }]);
		}
		if (s.includes("/cuti/jenis/list")) {
			return okJson([
				{ id: 1, nama: "Cuti Tahunan" },
				{ id: 2, nama: "Cuti Ibadah" },
			]);
		}
		if (s.includes("/total-hari-kerja")) return okJson(3);
		return okJson([]);
	});
}

function renderSheet(editing = null) {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<PengajuanFormSheet
				open
				onOpenChange={vi.fn()}
				pegawaiId={9}
				nama="Budi Santoso"
				nipam="19800101"
				jabatan="Staf"
				editing={editing}
			/>
		</QueryClientProvider>,
	);
}

/** Pilih tanggal hari ini di popover kalender yang terbuka. */
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

describe("PengajuanFormSheet", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("jenis berantai → sub-jenis muncul hanya saat parent punya anak; POST kirim csrfToken + jumlahHariKerja hasil fetch", async () => {
		mockFetch();
		renderSheet();

		// pilih jenis "Cuti Ibadah" (punya sub-jenis) → sub-jenis muncul
		// ponytail: combobox FK tak expose label sebagai accessible name — hitung jumlahnya
		expect(screen.getAllByRole("combobox").length).toBe(1); // hanya jenis
		await userEvent.click(screen.getAllByRole("combobox")[0]);
		await userEvent.click(await screen.findByRole("option", { name: "Cuti Ibadah" }));
		await waitFor(() => expect(screen.getAllByRole("combobox").length).toBe(2)); // + sub-jenis

		// isi tanggal (hari ini) → auto-fill jumlahHariKerja dari endpoint
		await pickDateByLabel("Tanggal Mulai");
		await pickDateByLabel("Tanggal Selesai");
		await waitFor(() => expect(screen.getByText("3", { selector: "div" })).toBeTruthy());

		// alasan
		const alasanField = screen.getByText("Alasan").closest("div") as HTMLElement;
		await userEvent.type(within(alasanField).getByRole("textbox"), "Ibadah umroh");

		await userEvent.click(screen.getByRole("button", { name: /simpan/i }));

		await waitFor(() => expect(postInit).not.toBeNull());
		const body = JSON.parse(String(postInit?.body));
		expect(postInit?.method).toBe("POST");
		expect(body.csrfToken).toBe("TOKEN-XYZ");
		expect(body.pegawaiId).toBe(9);
		expect(body.jenisCutiId).toBe(2);
		expect(body.jumlahHariKerja).toBe(3);
		expect(body.alasan).toBe("Ibadah umroh");
	});
});
