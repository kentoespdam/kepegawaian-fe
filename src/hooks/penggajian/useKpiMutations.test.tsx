// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCreateKpi, useDeleteKpi, useUpdateKpi, useUploadKpi } from "./useKpiMutations";

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

describe("useKpiMutations", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("useCreateKpi sends POST request to /api/proxy/penggajian/kpi", async () => {
		const mockResponse = {
			status: 200,
			data: { id: 10, nipam: "12345", periode: "202609", tunkin: 1500000, pph21Ter: 50000 },
		};

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		});

		const { result } = renderHook(() => useCreateKpi(), { wrapper });

		await act(async () => {
			result.current.mutate({
				nipam: "12345",
				periode: "202609",
				tunkin: 1500000,
				pph21Ter: 50000,
			});
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(global.fetch).toHaveBeenCalledWith(
			"/api/proxy/penggajian/kpi",
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({
					nipam: "12345",
					periode: "202609",
					tunkin: 1500000,
					pph21Ter: 50000,
				}),
			}),
		);
	});

	it("useUpdateKpi sends PUT request to /api/proxy/penggajian/kpi/{id}", async () => {
		const mockResponse = {
			status: 200,
			data: { id: 10, nipam: "12345", periode: "202609", tunkin: 2000000 },
		};

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		});

		const { result } = renderHook(() => useUpdateKpi(), { wrapper });

		await act(async () => {
			result.current.mutate({
				id: 10,
				data: {
					nipam: "12345",
					periode: "202609",
					tunkin: 2000000,
				},
			});
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(global.fetch).toHaveBeenCalledWith(
			"/api/proxy/penggajian/kpi/10",
			expect.objectContaining({
				method: "PUT",
				body: JSON.stringify({
					nipam: "12345",
					periode: "202609",
					tunkin: 2000000,
				}),
			}),
		);
	});

	it("useDeleteKpi sends DELETE request to /api/proxy/penggajian/kpi/{id}", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 204,
		});

		const { result } = renderHook(() => useDeleteKpi(), { wrapper });

		await act(async () => {
			result.current.mutate(10);
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(global.fetch).toHaveBeenCalledWith(
			"/api/proxy/penggajian/kpi/10",
			expect.objectContaining({
				method: "DELETE",
			}),
		);
	});

	it("useUploadKpi sends multipart POST request to /api/proxy/penggajian/kpi/upload?periode=...", async () => {
		const mockResponse = {
			status: 200,
			data: { periode: "202609", totalRows: 50, inserted: 30, updated: 20 },
		};

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		});

		const { result } = renderHook(() => useUploadKpi(), { wrapper });
		const file = new File(["dummy"], "kpi.xlsx", {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		await act(async () => {
			result.current.mutate({ file, periode: "202609" });
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(global.fetch).toHaveBeenCalledWith(
			"/api/proxy/penggajian/kpi/upload?periode=202609",
			expect.objectContaining({
				method: "POST",
			}),
		);
	});
});
