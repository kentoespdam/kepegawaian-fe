// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CutiKuotaResponse } from "@/types/cuti/kuota";
import { KuotaFormSheet } from "./kuota-form-sheet";

// cmdk (dipakai FKCombobox) butuh ResizeObserver — polyfill untuk jsdom
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
if (!globalThis.ResizeObserver)
	(globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = ResizeObserverMock;
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
		if (s.includes("/cuti/kuota") && init?.method) {
			postInit = init;
			return okJson({});
		}
		if (s.includes("/pegawai/list")) {
			return okJson([
				{
					id: 101,
					nipam: "19800101",
					nama: "Budi Santoso",
					organisasi: { id: 5, nama: "Bagian Keuangan" },
					jabatan: { id: 12, nama: "Kepala Bagian Keuangan" },
				},
			]);
		}
		return okJson([]);
	});
}

function renderSheet(editing: CutiKuotaResponse | null = null) {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<KuotaFormSheet open onOpenChange={vi.fn()} editing={editing} />
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

describe("KuotaFormSheet", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("POST /cuti/kuota: field numerik kosong dikirim undefined (bukan 0), tahun & expired terkirim", async () => {
		mockFetch();
		renderSheet();

		// Pilih pegawai via picker (search minimal 2 karakter, debounce 300ms)
		await userEvent.click(screen.getByRole("button", { name: /cari pegawai aktif/i }));
		await userEvent.type(screen.getByRole("searchbox"), "Budi");
		await userEvent.click(await screen.findByText("Budi Santoso", undefined, { timeout: 2000 }));

		// Tahun default tahun berjalan — isi expired, kosongkan kuota opsional
		await pickDateByLabel("Expired");

		await userEvent.click(screen.getByRole("button", { name: /simpan/i }));

		await waitFor(() => expect(postInit).not.toBeNull());
		const body = JSON.parse(String(postInit?.body));
		expect(postInit?.method).toBe("POST");
		expect(body.pegawaiId).toBe(101);
		expect(body.tahun).toBe(new Date().getFullYear());
		expect(body.expired).not.toBeNull();
		// ponytail: kosong → undefined, JANGAN kirim 0 (0 ≠ "tidak diisi" di BE)
		expect(body).not.toHaveProperty("kuota");
		expect(body).not.toHaveProperty("kuotaTambahan");
		expect(body).not.toHaveProperty("sisaKuota");
	});

	it("PUT /cuti/kuota/{id}: edit pre-fill dari row + payload JSON mengikuti kontrak", async () => {
		mockFetch();
		renderSheet({
			id: 55,
			pegawai: { id: 101, nipam: "19800101", nama: "Budi Santoso" },
			tahun: 2025,
			kuota: 12,
			kuotaTerpakai: 3,
			sisaKuota: 9,
			expired: "2025-12-31",
		});

		await userEvent.click(screen.getByRole("button", { name: /simpan/i }));

		await waitFor(() => expect(postInit).not.toBeNull());
		expect(postInit?.method).toBe("PUT");
		const body = JSON.parse(String(postInit?.body));
		expect(body.pegawaiId).toBe(101);
		expect(body.tahun).toBe(2025);
		expect(body.kuota).toBe(12);
		expect(body.expired).toBe("2025-12-31");
	});
});
