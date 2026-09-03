// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PegawaiOrganisasiTable } from "./pegawai-organisasi-table";

const MOCK_PEGAWAI = [
	{
		id: 101,
		nipam: "00101",
		nama: "Ahmad Dahlan",
		golongan: "III/a",
		namaJabatan: "Analis Kepegawaian",
		namaOrganisasi: "Bagian SDM",
		jmlJiwa: 3,
		kodePajak: "K/2",
		penghasilanKotor: 5000000,
		totalPotongan: 500000,
		pembulatan: 0,
		penghasilanBersih: 4500000,
		totalAddTambahan: 200000,
		totalAddPotongan: 50000,
		penghasilanBersihFinal: 4650000,
	},
	{
		id: 102,
		nipam: "00102",
		nama: "Siti Rahma",
		golongan: "II/c",
		namaJabatan: "Staff Administrasi",
		namaOrganisasi: "Bagian Keuangan",
		jmlJiwa: 1,
		kodePajak: "TK/0",
		penghasilanKotor: 3500000,
		totalPotongan: 200000,
		pembulatan: 0,
		penghasilanBersih: 3300000,
		totalAddTambahan: 0,
		totalAddPotongan: 0,
		penghasilanBersihFinal: 3300000,
	},
];

describe("PegawaiOrganisasiTable", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders pegawai grouped by organization in verifikasi variant", () => {
		const onSelectRow = vi.fn();
		render(
			<PegawaiOrganisasiTable
				pegawaiList={MOCK_PEGAWAI as never}
				isPending={false}
				periodeLabel="September 2026"
				selectedBatchMasterId={101}
				onSelectRow={onSelectRow}
				variant="verifikasi"
			/>,
		);

		// Header titles
		expect(screen.getByText(/Gaji \[Periode/i)).toBeInTheDocument();
		expect(screen.getByText("September 2026")).toBeInTheDocument();

		// Verifikasi specific columns
		expect(screen.getByText("PTKP")).toBeInTheDocument();
		expect(screen.getByText("Golongan")).toBeInTheDocument();
		expect(screen.getByText("Jiwa")).toBeInTheDocument();
		expect(screen.getByText("Net. Gaji")).toBeInTheDocument();

		// Single search input for verifikasi
		expect(screen.getByPlaceholderText("Cari Nama Pegawai...")).toBeInTheDocument();
		expect(screen.queryByPlaceholderText("Cari NIK...")).not.toBeInTheDocument();

		// Organizations and employees
		expect(screen.getByText("Bagian SDM")).toBeInTheDocument();
		expect(screen.getByText("Bagian Keuangan")).toBeInTheDocument();
		expect(screen.getByText("Ahmad Dahlan")).toBeInTheDocument();
		expect(screen.getByText("Siti Rahma")).toBeInTheDocument();

		// Click row
		fireEvent.click(screen.getByText("Siti Rahma"));
		expect(onSelectRow).toHaveBeenCalledWith(102);
	});

	it("renders tambahan variant with single search and tambahan columns", () => {
		const onSelectRow = vi.fn();
		render(
			<PegawaiOrganisasiTable
				pegawaiList={MOCK_PEGAWAI as never}
				isPending={false}
				periodeLabel="September 2026"
				selectedBatchMasterId={null}
				onSelectRow={onSelectRow}
				variant="tambahan"
			/>,
		);

		// Tambahan specific columns
		expect(screen.getByText("Jml. Gaji")).toBeInTheDocument();
		expect(screen.getByText("Peng. Tambahan")).toBeInTheDocument();
		expect(screen.getByText("Pot. Tambahan")).toBeInTheDocument();
		expect(screen.getByText("Jml. Gaji Final")).toBeInTheDocument();

		// Single search input (no separate NIK input)
		expect(screen.getByPlaceholderText("Cari Nama Pegawai...")).toBeInTheDocument();
		expect(screen.queryByPlaceholderText("Cari NIK...")).not.toBeInTheDocument();
	});

	it("filters employees when searching", () => {
		render(
			<PegawaiOrganisasiTable
				pegawaiList={MOCK_PEGAWAI as never}
				isPending={false}
				periodeLabel="September 2026"
				selectedBatchMasterId={null}
				onSelectRow={() => {}}
				variant="verifikasi"
			/>,
		);

		const searchInput = screen.getByPlaceholderText("Cari Nama Pegawai...");
		fireEvent.change(searchInput, { target: { value: "Ahmad" } });

		expect(screen.getByText("Ahmad Dahlan")).toBeInTheDocument();
		expect(screen.queryByText("Siti Rahma")).not.toBeInTheDocument();
	});

	it("groups by orgGroup when available", () => {
		const pegawaiWithOrgGroup = [
			{
				...MOCK_PEGAWAI[0],
				orgGroup: "DIVISI OPERASIONAL",
				namaOrganisasi: "Bagian SDM",
			},
			{
				...MOCK_PEGAWAI[1],
				orgGroup: "DIVISI KEUANGAN",
				namaOrganisasi: "Bagian Keuangan",
			},
		];

		render(
			<PegawaiOrganisasiTable
				pegawaiList={pegawaiWithOrgGroup as never}
				isPending={false}
				periodeLabel="September 2026"
				selectedBatchMasterId={null}
				onSelectRow={() => {}}
				variant="verifikasi"
			/>,
		);

		expect(screen.getByText("DIVISI OPERASIONAL")).toBeInTheDocument();
		expect(screen.getByText("DIVISI KEUANGAN")).toBeInTheDocument();
		expect(screen.queryByText("Bagian SDM")).not.toBeInTheDocument();
		expect(screen.queryByText("Bagian Keuangan")).not.toBeInTheDocument();

		const groupHeaders = screen.getAllByText(/DIVISI/i);
		expect(groupHeaders[0]).toHaveTextContent("DIVISI KEUANGAN");
		expect(groupHeaders[1]).toHaveTextContent("DIVISI OPERASIONAL");
	});
});
