// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useKpiList } from "./useKpiList";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
	usePathname: vi.fn().mockReturnValue("/penggajian/kpi"),
}));

function asSp(str = "") {
	return new URLSearchParams(str) as unknown as ReturnType<typeof useSearchParams>;
}

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

describe("useKpiList", () => {
	const mockReplace = vi.fn();

	beforeEach(() => {
		vi.restoreAllMocks();
		vi.mocked(useRouter).mockReturnValue({
			replace: mockReplace,
			push: vi.fn(),
			prefetch: vi.fn(),
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
		} as unknown as ReturnType<typeof useRouter>);
	});

	it("fetches KPI list with periode and pagination, extracting pageView correctly", async () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("periode=202609&page=1&size=10"));

		const mockItems = [
			{ id: 1, nipam: "111", periode: "202609", tunkin: 1000000, pph21Ter: 25000 },
			{ id: 2, nipam: "222", periode: "202609", tunkin: 2000000, pph21Ter: 50000 },
		];

		const mockPage = {
			content: mockItems,
			totalElements: 2,
			totalPages: 1,
			number: 0,
			size: 10,
			first: true,
			last: true,
		};

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: () => Promise.resolve({ status: 200, data: mockPage }),
		});

		const { result } = renderHook(() => useKpiList(), { wrapper });

		await waitFor(() => expect(result.current.query.isSuccess).toBe(true));

		expect(result.current.pageView.rows).toHaveLength(2);
		expect(result.current.pageView.total).toBe(2);
		expect(result.current.pageView.totalPages).toBe(1);
		expect(result.current.periode).toBe("202609");
	});

	it("nav updates search params correctly", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("periode=202609&page=1&size=10"));

		const { result } = renderHook(() => useKpiList(), { wrapper });

		act(() => {
			result.current.nav({ nipam: "12345", page: "1" });
		});

		expect(mockReplace).toHaveBeenCalledWith("?periode=202609&page=1&size=10&nipam=12345");
	});
});
