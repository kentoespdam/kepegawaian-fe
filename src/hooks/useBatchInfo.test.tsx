// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BatchProvider, useBatchContext } from "./BatchContext";
import { useBatchInfo } from "./useBatchInfo";

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

const BATCH_ID = "abc-123";
const MOCK_BATCH = {
	id: BATCH_ID,
	periode: "2026-08",
	status: "PENDING",
	totalPegawai: 42,
};

describe("useBatchInfo", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("fetches batch detail via /api/proxy/penggajian/batch/{id}", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: MOCK_BATCH }),
		} as Response);

		const { result } = renderHook(() => useBatchInfo(BATCH_ID), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(MOCK_BATCH);
		expect(global.fetch).toHaveBeenCalledWith(`/api/proxy/penggajian/batch/${BATCH_ID}`);
	});

	it("does not fetch when id is null", () => {
		vi.spyOn(global, "fetch").mockResolvedValue({} as Response);

		renderHook(() => useBatchInfo(null), { wrapper });

		expect(global.fetch).not.toHaveBeenCalled();
	});
});

describe("BatchContext", () => {
	it("provides batch data to consumers", () => {
		const batchData = MOCK_BATCH;

		function Consumer() {
			const ctx = useBatchContext();
			return <div data-testid="status">{ctx.data?.status ?? "none"}</div>;
		}

		const { getByTestId } = render(
			<BatchProvider value={{ data: batchData, isPending: false, isError: false, error: null }}>
				<Consumer />
			</BatchProvider>,
		);

		expect(getByTestId("status").textContent).toBe("PENDING");
	});

	it("returns defaults outside provider", () => {
		function Consumer() {
			const ctx = useBatchContext();
			return <div data-testid="pending">{String(ctx.isPending)}</div>;
		}

		const { getByTestId } = render(<Consumer />);

		expect(getByTestId("pending").textContent).toBe("true");
	});
});
