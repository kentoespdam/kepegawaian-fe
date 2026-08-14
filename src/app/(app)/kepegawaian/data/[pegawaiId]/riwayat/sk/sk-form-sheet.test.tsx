// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SkFormSheet } from "./sk-form-sheet";

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
		if (s.includes("/kepegawaian/riwayat/sk") && init?.method === "POST") {
			postBody = String(init?.body ?? "");
			return okJson({});
		}
		// opsi master (golongan) — kosong
		return okJson([]);
	});
}

function renderSheet() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<SkFormSheet pegawaiId="4" editingId={null} isOpen onClose={vi.fn()} />
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

async function fillRequiredFields() {
	// Jenis SK (satu-satunya Select di form ini)
	await userEvent.click(screen.getAllByRole("combobox")[0]);
	await userEvent.click(await screen.findByRole("option", { name: "Calon Pegawai" }));

	// Nomor SK — textbox pertama di form
	await userEvent.type(screen.getAllByRole("textbox")[0], "SK-TEST-001");

	// Tanggal SK — popover pertama yang menampilkan "Pilih tanggal"
	const tanggalSkField = screen.getByText("Tanggal SK").closest("div") as HTMLElement;
	await userEvent.click(within(tanggalSkField).getByText("Pilih tanggal"));
	await pickTodayInOpenPopover();

	// TMT Berlaku
	const tmtField = screen.getByText("TMT Berlaku").closest("div") as HTMLElement;
	await userEvent.click(within(tmtField).getByText("Pilih tanggal"));
	await pickTodayInOpenPopover();
}

// ── Tests ──

describe("SkFormSheet", () => {
	beforeEach(() => {
		cleanup();
		postBody = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("mengirim golonganId (min 0) & updateMaster (boolean) walau tidak diisi — server 500 kalau dihilangkan", async () => {
		mockFetch();
		renderSheet();
		await fillRequiredFields();

		// Golongan TIDAK dipilih — payload tetap harus memuat golonganId: 0
		await userEvent.click(screen.getByRole("button", { name: /simpan/i }));

		expect(postBody).not.toBeNull();
		const sent = JSON.parse(postBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				pegawaiId: 4,
				jenisSk: "SK_CAPEG",
				nomorSk: "SK-TEST-001",
				golonganId: 0,
				updateMaster: false,
			}),
		);
	});
});
