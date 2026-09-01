// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
	useParams: () => ({ id: "batch-1" }),
	useRouter: () => ({ replace: mockReplace }),
	useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/hooks/penggajian/useCreateBatchMasterProses", () => ({
	useCreateBatchMasterProses: () => ({
		mutateAsync: vi.fn().mockResolvedValue(undefined),
		isPending: false,
	}),
}));

vi.mock("@/hooks/penggajian/useDeleteBatchMasterProses", () => ({
	useDeleteBatchMasterProses: () => ({
		mutateAsync: vi.fn().mockResolvedValue(undefined),
	}),
}));

const MOCK_MASTER = [
	{
		id: 1,
		nipam: "NIP001",
		nama: "Budi Santoso",
		namaOrganisasi: "Bagian Keuangan",
		namaJabatan: "Staf",
		golongan: "III",
	},
	{
		id: 2,
		nipam: "NIP002",
		nama: "Siti Rahayu",
		namaOrganisasi: "Bagian Keuangan",
		namaJabatan: "Manager",
		golongan: "IV",
	},
];

function mockFetch(routes: Record<string, unknown>) {
	vi.spyOn(global, "fetch").mockImplementation((url: string | URL | Request) => {
		const u = typeof url === "string" ? url : url.toString();
		for (const [pattern, data] of Object.entries(routes)) {
			if (u.includes(pattern)) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ data }),
				} as Response);
			}
		}
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ data: [] }),
		} as Response);
	});
}

async function renderClient() {
	const { TambahanClient } = await import("./tambahan-client");
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<TambahanClient />
		</QueryClientProvider>,
	);
}

describe("TambahanClient", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		mockReplace.mockClear();
	});
	afterEach(() => cleanup());

	it("renders daftar pegawai grouped by organisasi", async () => {
		mockFetch({ "/penggajian/batch/master": MOCK_MASTER });

		await renderClient();

		await waitFor(() => {
			expect(screen.getByText("Bagian Keuangan")).toBeInTheDocument();
		});
		expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Siti Rahayu").length).toBeGreaterThanOrEqual(1);
	});

	it("shows empty state when no pegawai", async () => {
		mockFetch({ "/penggajian/batch/master": [] });

		await renderClient();

		await waitFor(() => {
			expect(screen.getByText("Belum ada data")).toBeInTheDocument();
		});
	});

	it("shows placeholder when no pegawai selected", async () => {
		mockFetch({ "/penggajian/batch/master": MOCK_MASTER });

		await renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Pilih pegawai di panel kiri").length).toBeGreaterThanOrEqual(1);
		});
	});

	it("clicking pegawai triggers router.replace with pegawaiId", async () => {
		const user = userEvent.setup();
		mockFetch({ "/penggajian/batch/master": MOCK_MASTER });

		await renderClient();

		await waitFor(() => {
			expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
		});
		await user.click(screen.getAllByText("Budi Santoso")[0]);

		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalled();
		});
		expect(mockReplace.mock.calls[0][0]).toContain("pegawaiId=1");
	});

	it("shows skeleton while loading pegawai list", async () => {
		vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

		const { container } = await renderClient();

		const skeletons = container.querySelectorAll("[data-slot='skeleton']");
		expect(skeletons.length).toBeGreaterThanOrEqual(1);
	});
});
