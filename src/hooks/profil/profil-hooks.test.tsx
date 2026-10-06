// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProfilApproval } from "./useProfilApproval";

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

describe("Profil Hooks", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.stubGlobal("fetch", vi.fn());
	});

	it("useProfilApproval fetches data correctly", async () => {
		const mockData = { content: [{ id: 1, status: "PENDING" }] };
		vi.mocked(fetch).mockResolvedValueOnce(okJson(mockData));

		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useProfilApproval(1, 10, "", "", "", null, null), { wrapper });

		await waitFor(() => expect(result.current.query.isSuccess).toBe(true));
		expect(result.current.query.data).toEqual(mockData);
	});
});
