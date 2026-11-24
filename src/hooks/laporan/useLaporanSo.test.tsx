// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { laporanKeys } from "@/hooks/keys/laporan-keys";
import { useLaporanSo } from "./useLaporanSo";

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

describe("laporanKeys.so", () => {
	it("generates correct hierarchical query keys", () => {
		expect(laporanKeys.so()).toEqual(["laporan", "so", undefined]);
		expect(laporanKeys.so({ maxLevel: 6, format: "flat" })).toEqual(["laporan", "so", { maxLevel: 6, format: "flat" }]);
	});
});

describe("useLaporanSo", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("fetches structure data successfully", async () => {
		const mockData = [
			{
				id: 1,
				parentId: null,
				kodeJabatan: "0",
				namaJabatan: "Kepala Dewan Pengawas",
				level: 1,
				namaPegawai: "Drs. H. Suwandi, M.M.",
				nipam: "8901001",
				namaOrganisasi: "DEWAN PENGAWAS",
				isLowong: false,
			},
			{
				id: 2,
				parentId: 1,
				kodeJabatan: "1",
				namaJabatan: "Direktur Utama",
				level: 2,
				namaPegawai: "Priyo Supriyono, S.T.",
				nipam: "8902001",
				namaOrganisasi: "DIREKTORAT UTAMA",
				isLowong: false,
			},
		];

		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				status: 200,
				statusText: "OK",
				data: mockData,
			}),
		});
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useLaporanSo({ maxLevel: 6, format: "flat" }), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(fetchMock).toHaveBeenCalledWith("/api/proxy/laporan/kepegawaian/so?maxLevel=6&format=flat");
		expect(result.current.data).toEqual(mockData);
	});

	it("handles fetch error correctly", async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: false,
			status: 500,
			statusText: "Internal Server Error",
			json: async () => ({
				status: 500,
				message: "Server database error",
			}),
		});
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useLaporanSo(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(result.current.error).toBeDefined();
	});
});
