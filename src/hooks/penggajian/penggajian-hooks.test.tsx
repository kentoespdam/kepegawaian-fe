// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBatchInfo } from "../useBatchInfo";
import { useBatchAction, useDeleteBatch, useReprocessBatch } from "./useBatchAction";

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

function mockFetch(data?: unknown) {
	return vi.fn().mockResolvedValue({
		ok: true,
		json: () => Promise.resolve({ data }),
	});
}

function mockFetchError(status = 500, message = "Server error") {
	return vi.fn().mockResolvedValue({
		ok: false,
		status,
		json: () => Promise.resolve({ message }),
	});
}

describe("useBatchInfo", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("fetches batch detail via GET /penggajian/batch/{id}", async () => {
		const mockBatch = { id: "abc-123", periode: "2026-08", status: "PENDING" };
		global.fetch = mockFetch(mockBatch);

		const { result } = renderHook(() => useBatchInfo("abc-123"), { wrapper });
		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(mockBatch);
		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/abc-123");
	});

	it("does not fetch when id is null", () => {
		global.fetch = mockFetch();
		renderHook(() => useBatchInfo(null), { wrapper });
		expect(global.fetch).not.toHaveBeenCalled();
	});
});

describe("useBatchAction", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("sends PATCH to the correct URL for verify2", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useBatchAction("batch-1", "batch-1/verify2"), { wrapper });

		await result.current.mutateAsync();

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-1/verify2", {
			method: "PATCH",
		});
	});

	it("sends PATCH to the correct URL for accept", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useBatchAction("batch-1", "batch-1/accept"), { wrapper });

		await result.current.mutateAsync();

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-1/accept", {
			method: "PATCH",
		});
	});

	it("sends PATCH to the correct URL for reprocess", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useBatchAction("batch-1", "batch-1/reprocess"), { wrapper });

		await result.current.mutateAsync();

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-1/reprocess", {
			method: "PATCH",
		});
	});

	it("sends PATCH to the correct URL for kirimSlipGaji", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useBatchAction("batch-1", "master/upload/batch-1"), { wrapper });

		await result.current.mutateAsync();

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/master/upload/batch-1", {
			method: "PATCH",
		});
	});

	it("throws on error response", async () => {
		global.fetch = mockFetchError(400, "Bad request");
		const { result } = renderHook(() => useBatchAction("batch-1", "batch-1/verify2"), { wrapper });

		await expect(result.current.mutateAsync()).rejects.toThrow("Bad request");
	});
});

describe("useDeleteBatch", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("sends DELETE to /penggajian/batch/{id}", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useDeleteBatch(), { wrapper });

		await result.current.mutateAsync("batch-123");

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-123", {
			method: "DELETE",
		});
	});
});

describe("useReprocessBatch", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("sends PATCH to /penggajian/batch/{id}/reprocess", async () => {
		global.fetch = mockFetch();
		const { result } = renderHook(() => useReprocessBatch(), { wrapper });

		await result.current.mutateAsync("batch-123");

		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-123/reprocess", {
			method: "PATCH",
		});
	});
});
