// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUserList } from "./useUserList";

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

describe("Sistem Hooks", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.stubGlobal("fetch", vi.fn());
	});

	it("useUserList fetches data correctly", async () => {
		const mockData = { content: [{ id: 1, username: "admin" }] };
		vi.mocked(fetch).mockResolvedValueOnce(okJson(mockData));

		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useUserList(1, 10, "", ""), { wrapper });

		await waitFor(() => expect(result.current.query.isSuccess).toBe(true));
		expect(result.current.query.data).toEqual(mockData);
	});
});
