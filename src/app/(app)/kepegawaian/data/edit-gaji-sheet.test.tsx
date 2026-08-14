// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SheetEditGaji } from "./edit-gaji-sheet";

// ── Data ──

/** Pegawai dengan rumah dinas. */
const MOCK_DETAIL: PegawaiResponseDetail = {
	id: 123,
	nipam: "199501012024011001",
	statusPegawai: "PEGAWAI",
	kodePajak: { id: 5, kode: "KP1" },
	gajiProfil: { id: 6, nama: "Profil Gaji A" },
	rumahDinas: { id: 7, nama: "Rumah Dinas 1" },
	gajiPokok: 5_000_000,
	phdp: 100_000,
	isAskes: true,
	tmtKerja: "2020-01-01",
	tmtPensiun: "2055-01-01",
};

/** Pegawai TANPA rumah dinas (kasus nyata: server wajib terima rumahDinasId min 0). */
const MOCK_DETAIL_NO_RUMAH_DINAS: PegawaiResponseDetail = {
	...MOCK_DETAIL,
	rumahDinas: undefined,
};

/** Helper: buat Response sukses dengan envelope { data: ... }. */
function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

let patchBody: string | null = null;

function mockFetch(detail: unknown) {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		// GET detail pegawai
		if (s.includes("/api/proxy/pegawai/123") && (!init?.method || init.method === "GET")) {
			return okJson(detail);
		}
		// PATCH gaji — tangkap body request
		if (s.endsWith("/api/proxy/pegawai/123/gaji")) {
			patchBody = String(init?.body ?? "");
			return okJson({});
		}
		// Opsi pajak / status pegawai / profil gaji / rumah dinas — kosong
		return okJson([]);
	});
}

function renderSheet() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<SheetEditGaji pegawaiId="123" onClose={vi.fn()} />
		</QueryClientProvider>,
	);
}

async function editAndSubmit() {
	const gajiPokokInput = await screen.findByDisplayValue("5000000");
	await userEvent.clear(gajiPokokInput);
	await userEvent.type(gajiPokokInput, "6000000");
	await userEvent.clear(screen.getByDisplayValue("100000"));
	await userEvent.type(screen.getByDisplayValue(""), "150000");
	await userEvent.click(screen.getByRole("button", { name: /simpan/i }));
}

// ── Tests ──

describe("SheetEditGaji", () => {
	beforeEach(() => {
		cleanup();
		patchBody = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("mengirim payload yang sesuai dengan form saat submit (field opsional ikut terkirim)", async () => {
		mockFetch(MOCK_DETAIL);
		renderSheet();
		await editAndSubmit();

		expect(patchBody).not.toBeNull();
		const sent = JSON.parse(patchBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				statusPegawai: "PEGAWAI",
				kodePajakId: 5,
				gajiProfilId: 6,
				tmtKerja: "2020-01-01",
				tmtPensiun: "2055-01-01",
				gajiPokok: 6_000_000,
				phdp: 150_000,
				isAskes: true,
				rumahDinasId: 7,
			}),
		);
	});

	it("pegawai tanpa rumah dinas → kirim rumahDinasId = 0, bukan dihilangkan (hindari 500 'must not be null')", async () => {
		mockFetch(MOCK_DETAIL_NO_RUMAH_DINAS);
		renderSheet();
		await editAndSubmit();

		expect(patchBody).not.toBeNull();
		const sent = JSON.parse(patchBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				statusPegawai: "PEGAWAI",
				kodePajakId: 5,
				gajiProfilId: 6,
				rumahDinasId: 0,
			}),
		);
	});
});
