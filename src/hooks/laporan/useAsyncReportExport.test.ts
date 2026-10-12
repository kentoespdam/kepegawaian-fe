import { act, renderHook } from "@testing-library/react";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAsyncReportExport } from "./useAsyncReportExport";

vi.mock("sonner", () => ({
	toast: {
		loading: vi.fn().mockReturnValue("toast-1"),
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe("useAsyncReportExport", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("handles immediate completed export", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				data: {
					jobId: "job-123",
					status: "COMPLETED",
				},
			}),
		});

		const { result } = renderHook(() => useAsyncReportExport());

		await act(async () => {
			await result.current.exportReport({
				endpoint: "/api/proxy/laporan/kepegawaian/duk/export",
				reportName: "Laporan DUK",
			});
		});

		expect(toast.loading).toHaveBeenCalledWith("Menyiapkan Laporan DUK...");
		expect(toast.success).toHaveBeenCalledWith(
			"Laporan DUK siap diunduh!",
			expect.objectContaining({
				id: "toast-1",
				action: expect.objectContaining({ label: "Unduh" }),
			}),
		);
		expect(result.current.isExporting).toBe(false);
	});

	it("handles background polling until COMPLETED", async () => {
		// First call: trigger export -> returns PENDING
		// Second call: poll status -> returns COMPLETED
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					data: {
						jobId: "job-456",
						status: "PENDING",
					},
				}),
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					data: {
						jobId: "job-456",
						status: "COMPLETED",
					},
				}),
			});

		global.fetch = fetchMock;

		const { result } = renderHook(() => useAsyncReportExport());

		await act(async () => {
			await result.current.exportReport({
				endpoint: "/api/proxy/laporan/kepegawaian/dnp/export",
				reportName: "Laporan DNP",
			});
		});

		expect(toast.loading).toHaveBeenCalledWith("Menyiapkan Laporan DNP...");
		expect(toast.loading).toHaveBeenCalledWith("Sedang memproses Laporan DNP di server...", { id: "toast-1" });

		// Advance timer to trigger interval
		await act(async () => {
			vi.advanceTimersByTime(2500);
		});

		expect(fetchMock).toHaveBeenCalledWith("/api/proxy/laporan/kepegawaian/jobs/job-456");
		expect(toast.success).toHaveBeenCalledWith(
			"Laporan DNP selesai dibuat!",
			expect.objectContaining({
				id: "toast-1",
				action: expect.objectContaining({ label: "Unduh" }),
			}),
		);
		expect(result.current.isExporting).toBe(false);
	});
});
