// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RincianGajiPanel } from "./rincian-gaji-panel";

const MOCK_PROSES = [
	{
		id: 1,
		batchMasterId: 10,
		kode: "GAPOK",
		nama: "Gaji Pokok",
		jenisGaji: "PEMASUKAN",
		nilai: 4000000,
	},
	{
		id: 2,
		batchMasterId: 10,
		kode: "ADD_BONUS",
		nama: "Bonus Kinerja",
		jenisGaji: "PEMASUKAN",
		nilai: 500000,
	},
	{
		id: 3,
		batchMasterId: 10,
		kode: "POT_BPJS",
		nama: "BPJS Kesehatan",
		jenisGaji: "POTONGAN",
		nilai: 150000,
	},
	{
		id: 4,
		batchMasterId: 10,
		kode: "ADD_KASBON",
		nama: "Kasbon Pegawai",
		jenisGaji: "POTONGAN",
		nilai: 100000,
	},
];

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
	return function Wrapper({ children }: { children: ReactNode }) {
		return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	};
}

describe("RincianGajiPanel", () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	beforeEach(() => {
		global.fetch = vi.fn().mockImplementation((url: string) => {
			if (url.includes("/api/proxy/penggajian/batch/master/proses/10")) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ status: 200, data: MOCK_PROSES }),
				});
			}
			return Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ status: 200, data: [] }),
			});
		});
	});

	it("renders empty state prompt when no pegawai is selected", () => {
		render(<RincianGajiPanel selectedPegawai={null} canEdit={false} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByText("Rincian Gaji")).toBeInTheDocument();
		expect(
			screen.getByText("Klik salah satu baris pegawai pada tabel di kiri untuk melihat rincian gaji."),
		).toBeInTheDocument();
	});

	it("renders komponen pemasukan & potongan in read-only mode (canEdit=false)", async () => {
		render(<RincianGajiPanel selectedPegawai={{ id: 10, nama: "Budi Pratama" } as never} canEdit={false} />, {
			wrapper: createWrapper(),
		});

		await waitFor(() => {
			expect(screen.getByText("Budi Pratama")).toBeInTheDocument();
			expect(screen.getByText("Gaji Pokok")).toBeInTheDocument();
			expect(screen.getByText("Bonus Kinerja")).toBeInTheDocument();
			expect(screen.getByText("BPJS Kesehatan")).toBeInTheDocument();
			expect(screen.getByText("Kasbon Pegawai")).toBeInTheDocument();
		});

		// Add & Delete buttons should NOT exist in read-only mode
		expect(screen.queryByRole("button", { name: /Tambah Komponen/i })).not.toBeInTheDocument();
		expect(screen.queryByTitle("Hapus Komponen")).not.toBeInTheDocument();
	});

	it("renders Tambah Komponen and Delete buttons when canEdit=true", async () => {
		render(
			<RincianGajiPanel
				selectedPegawai={{ id: 10, nama: "Budi Pratama" } as never}
				canEdit={true}
				showAddButton={true}
			/>,
			{ wrapper: createWrapper() },
		);

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Tambah Komponen/i })).toBeInTheDocument();
		});

		// Should show delete buttons for ADD_BONUS and ADD_KASBON
		const deleteButtons = screen.getAllByTitle("Hapus Komponen");
		expect(deleteButtons).toHaveLength(2);
	});
});
