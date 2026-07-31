// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RolesProvider } from "@/hooks/useRoles";
import CutiPage from "./page";

// ── Mock next/navigation ──

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
	// forbidden() → notFound() — mock agar gate RBAC bisa diuji
	notFound: vi.fn(() => {
		throw new Error("NOT_FOUND");
	}),
}));

// ── Data ──

// ponytail: tahun dinamis — page memakai new Date().getFullYear(), jangan hardcode
const YEAR = new Date().getFullYear();

const MOCK_ROWS = [
	{
		id: 1,
		tanggalMulai: "2026-07-27",
		tanggalSelesai: "2026-07-29",
		jenisCuti: { id: 1, nama: "Cuti Tahunan" },
		subJenisCuti: { id: 2, nama: "Cuti Tahunan Biasa" },
		jumlahHariKerja: 3,
		approvalCutiStatus: "APPROVED",
	},
	{
		id: 2,
		tanggalMulai: "2026-08-03",
		tanggalSelesai: "2026-08-03",
		jenisCuti: { id: 3, nama: "Cuti Sakit" },
		jumlahHariKerja: 1,
		approvalCutiStatus: "PENDING",
	},
];

const MOCK_PAGE = {
	totalElements: 2,
	totalPages: 1,
	size: 10,
	number: 0,
	numberOfElements: 2,
	first: true,
	last: true,
	empty: false,
	content: MOCK_ROWS,
};

// K-C5: verifikasi container — kuota tahun terpilih bisa di page.content ATAU additional.
const KUOTA_ROW = { id: 1, tahun: YEAR, kuota: 12, kuotaTambahan: 2, kuotaTerpakai: 5, sisaKuota: 9 };

const MOCK_KUOTA_PAGE_CONTENT = {
	page: {
		totalElements: 1,
		totalPages: 1,
		size: 10,
		number: 0,
		numberOfElements: 1,
		first: true,
		last: true,
		empty: false,
		content: [KUOTA_ROW],
	},
	additional: [],
};

const MOCK_KUOTA_ADDITIONAL = {
	page: {
		totalElements: 0,
		totalPages: 0,
		size: 10,
		number: 0,
		numberOfElements: 0,
		first: true,
		last: true,
		empty: true,
		content: [],
	},
	additional: [KUOTA_ROW],
};

/** Helper: buat Response sukses dengan envelope { data: ... }. */
function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

function mockDefaultFetch(kuota = MOCK_KUOTA_PAGE_CONTENT) {
	vi.mocked(globalThis.fetch).mockImplementation(async (url: string) => {
		const s = typeof url === "string" ? url : url instanceof Request ? url.url : String(url);
		if (s.includes("/cuti/pengajuan/") && s.includes("/pegawai")) {
			return okJson(MOCK_PAGE);
		}
		if (s.includes("/cuti/kuota")) {
			return okJson(kuota);
		}
		// Default: return empty — biar query lain gak crash
		return okJson({});
	});
}

function renderPage() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<RolesProvider roles={["admin"]}>
			<QueryClientProvider client={qc}>
				<CutiPage />
			</QueryClientProvider>
		</RolesProvider>,
	);
}

// ── Tests ──

describe("Riwayat Cuti page", () => {
	beforeEach(() => {
		cleanup();
		vi.clearAllMocks();

		// Spy on fetch dulu — vi.mocked cuma type cast, mock methods butuh spy
		vi.spyOn(globalThis, "fetch");

		// Mock next/navigation
		vi.mocked(useParams).mockReturnValue({ pegawaiId: "123" });
		vi.mocked(useRouter).mockReturnValue({ replace: vi.fn(), push: vi.fn() } as unknown as ReturnType<
			typeof useRouter
		>);
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
	});

	it("menampilkan skeleton saat loading", () => {
		renderPage();
		expect(screen.getByText("No")).toBeInTheDocument();
		expect(screen.getByText("Periode")).toBeInTheDocument();
		expect(screen.getByText("Jenis Cuti")).toBeInTheDocument();
		expect(screen.getByText("Jumlah Hari Kerja")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("menampilkan tabel dengan data setelah fetch berhasil", async () => {
		mockDefaultFetch();
		renderPage();

		// periode: formatDate(mulai) – formatDate(selesai) dalam satu sel
		expect(await screen.findByText("27 Juli 2026 – 29 Juli 2026")).toBeInTheDocument();
		expect(screen.getByText("3 Agustus 2026 – 3 Agustus 2026")).toBeInTheDocument();

		// jenis cuti + sub jenis (sub di bawah, label kecil)
		expect(screen.getByText("Cuti Tahunan")).toBeInTheDocument();
		expect(screen.getByText("Cuti Tahunan Biasa")).toBeInTheDocument();
		expect(screen.getByText("Cuti Sakit")).toBeInTheDocument();

		// jumlah hari kerja — scope ke barisnya ("1" bentrok dengan kolom No)
		const sakitRow = screen.getByText("Cuti Sakit").closest("tr") as HTMLElement;
		expect(within(sakitRow).getByText("1")).toBeInTheDocument();
		const tahunanRow = screen.getByText("Cuti Tahunan").closest("tr") as HTMLElement;
		expect(within(tahunanRow).getByText("3")).toBeInTheDocument();

		// status badge berlabel
		expect(screen.getByText("Disetujui")).toBeInTheDocument();
		expect(screen.getByText("Menunggu")).toBeInTheDocument();
	});

	it("read-only: tidak ada tombol Tambah, tidak ada kolom Aksi", async () => {
		mockDefaultFetch();
		renderPage();
		await screen.findByText("Cuti Tahunan");
		expect(screen.queryByText("Tambah Cuti")).not.toBeInTheDocument();
		expect(screen.queryByText("Aksi")).not.toBeInTheDocument();
	});

	it("menampilkan strip 3 kartu dari page.content (K-C5)", async () => {
		mockDefaultFetch(MOCK_KUOTA_PAGE_CONTENT);
		renderPage();

		// Kuota = kuota + kuotaTambahan (12 + 2), Diambil = kuotaTerpakai (5), Sisa = sisaKuota (9)
		expect(await screen.findByText("Kuota Cuti")).toBeInTheDocument();
		expect(screen.getByText("Diambil")).toBeInTheDocument();
		expect(screen.getByText("Sisa")).toBeInTheDocument();
		expect(screen.getByText("14")).toBeInTheDocument();
		// ponytail: selector "p" — nilai kartu ada di <p>, hindari bentrok option select pagination
		expect(screen.getByText("5", { selector: "p" })).toBeInTheDocument();
		expect(screen.getByText("9", { selector: "p" })).toBeInTheDocument();
	});

	it("strip membaca baris kuota dari additional saat page kosong (K-C5)", async () => {
		mockDefaultFetch(MOCK_KUOTA_ADDITIONAL);
		renderPage();

		expect(await screen.findByText("14")).toBeInTheDocument();
		expect(screen.getByText("5", { selector: "p" })).toBeInTheDocument();
		expect(screen.getByText("9", { selector: "p" })).toBeInTheDocument();
	});

	it("strip tanpa record → kartu — + keterangan belum ada kuota", async () => {
		mockDefaultFetch({
			page: {
				totalElements: 0,
				totalPages: 0,
				size: 10,
				number: 0,
				numberOfElements: 0,
				first: true,
				last: true,
				empty: true,
				content: [],
			},
			additional: [],
		});
		renderPage();

		expect(await screen.findByText("Belum ada kuota tahun ini.")).toBeInTheDocument();
	});

	it("menampilkan panel error saat fetch tabel gagal", async () => {
		vi.mocked(globalThis.fetch).mockRejectedValue(new Error("Network error"));
		renderPage();

		expect(await screen.findByText("Gagal memuat data")).toBeInTheDocument();
		expect(screen.getByText("Coba lagi")).toBeInTheDocument();
	});

	it("ganti tahun → router.replace dengan tahun= (K-C3 URL source of truth)", async () => {
		const replace = vi.fn();
		vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
		mockDefaultFetch();
		renderPage();

		await screen.findByText("Cuti Tahunan");
		await userEvent.click(screen.getByRole("combobox", { name: /tahun/i }));
		await userEvent.click(await screen.findByText(String(YEAR - 1)));

		expect(replace).toHaveBeenCalledWith(expect.stringContaining(`tahun=${YEAR - 1}`));
	});

	it("RBAC: roles tanpa view pegawai → forbidden (notFound)", () => {
		const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		expect(() =>
			render(
				<RolesProvider roles={["unknown-role"]}>
					<QueryClientProvider client={qc}>
						<CutiPage />
					</QueryClientProvider>
				</RolesProvider>,
			),
		).toThrow("NOT_FOUND");
	});
});
