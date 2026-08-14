// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SheetEditProfil } from "./edit-profil-sheet";

// ── Data ──

/** Pegawai lengkap: punya semua FK. */
const MOCK_DETAIL: PegawaiResponseDetail = {
	id: 123,
	nipam: "199501012024011001",
	biodata: {
		nama: "Budi Santoso",
		jenisKelamin: "LAKI_LAKI",
		statusKawin: "KAWIN",
		agama: "ISLAM",
		tempatLahir: "Surabaya",
		tanggalLahir: "1995-01-01",
		alamat: "Jl. Merdeka No. 1",
		ibuKandung: "Siti",
		telp: "081234567890",
	},
	organisasi: { id: 1, nama: "Org Utama" },
	jabatan: { id: 2, nama: "Staff SDM" },
	profesi: { id: 3, nama: "SDM" },
	golongan: { id: 4, golongan: "III", pangkat: "a" },
	email: "budi@example.com",
};

/** Pegawai TANPA profesi & golongan (kasus nyata: 8 dari 272 pegawai di data dev). */
const MOCK_DETAIL_NO_SOFT_FK: PegawaiResponseDetail = {
	...MOCK_DETAIL,
	profesi: undefined,
	golongan: undefined,
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
		// PATCH profil — tangkap body request
		if (s.endsWith("/api/proxy/pegawai/123/profil")) {
			patchBody = String(init?.body ?? "");
			return okJson({});
		}
		// FK master options (organisasi/profesi/golongan/jabatan) — kosong
		return okJson([]);
	});
}

function renderSheet() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<SheetEditProfil pegawaiId="123" onClose={vi.fn()} />
		</QueryClientProvider>,
	);
}

async function editAndSubmit() {
	const namaInput = await screen.findByDisplayValue("Budi Santoso");
	await userEvent.clear(namaInput);
	await userEvent.type(namaInput, "Budi Baru");
	await userEvent.clear(screen.getByDisplayValue("budi@example.com"));
	await userEvent.type(screen.getByDisplayValue(""), "baru@example.com");
	await userEvent.clear(screen.getByDisplayValue("081234567890"));
	await userEvent.type(screen.getByDisplayValue(""), "081111111111");
	await userEvent.clear(screen.getByDisplayValue("Jl. Merdeka No. 1"));
	await userEvent.type(screen.getByDisplayValue(""), "Jl. Baru No. 2");
	await userEvent.click(screen.getByRole("button", { name: /simpan/i }));
}

// ── Tests ──

describe("SheetEditProfil", () => {
	beforeEach(() => {
		cleanup();
		patchBody = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("mengirim payload yang sesuai dengan form saat submit (semua field yang diedit ikut terkirim)", async () => {
		mockFetch(MOCK_DETAIL);
		renderSheet();
		await editAndSubmit();

		expect(patchBody).not.toBeNull();
		const sent = JSON.parse(patchBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				id: 123,
				nipam: "199501012024011001",
				nama: "Budi Baru",
				email: "baru@example.com",
				telp: "081111111111",
				alamat: "Jl. Baru No. 2",
				// FK kepegawaian selalu dikirim sebagai angka (min 0) — JANGAN dihilangkan
				organisasiId: 1,
				jabatanId: 2,
				profesiId: 3,
				golonganId: 4,
			}),
		);
	});

	it("pegawai tanpa profesi/golongan → kirim profesiId & golonganId = 0, bukan dihilangkan (hindari 500 'must not be null')", async () => {
		mockFetch(MOCK_DETAIL_NO_SOFT_FK);
		renderSheet();
		await editAndSubmit();

		expect(patchBody).not.toBeNull();
		const sent = JSON.parse(patchBody as string);
		expect(sent).toEqual(
			expect.objectContaining({
				id: 123,
				organisasiId: 1,
				jabatanId: 2,
				profesiId: 0,
				golonganId: 0,
			}),
		);
	});
});
