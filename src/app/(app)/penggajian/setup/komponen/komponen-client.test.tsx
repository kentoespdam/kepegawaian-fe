// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { KomponenClient } from "./komponen-client";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

function renderWithProviders() {
	return render(
		<AuthProvider roles={["admin"]} permissions={["penggajian.setup"]}>
			<QueryClientProvider client={queryClient}>
				<KomponenClient />
			</QueryClientProvider>
		</AuthProvider>,
	);
}

/** Mock fetch that routes by URL substring. */
function mockFetchByEndpoint(responses: Record<string, unknown>) {
	globalThis.fetch = vi.fn().mockImplementation(async (input: string | URL | Request) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		for (const [pattern, body] of Object.entries(responses)) {
			if (s.includes(pattern)) {
				return { ok: true, json: async () => body } as Response;
			}
		}
		return { ok: true, json: async () => ({ data: [] }) } as Response;
	});
}

describe("KomponenClient", () => {
	const mockReplace = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		queryClient.clear();
		vi.mocked(useRouter).mockReturnValue({
			push: vi.fn(),
			replace: mockReplace,
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
			prefetch: vi.fn(),
		});
	});

	it("renders komponen rows when ?profilId=3&page=1 (regression: data?.data broke display)", async () => {
		// Reproduces the bug where `fromPage(komponenList.data?.data)` returned empty
		// because handle() already unwraps the envelope and the inner is a Page<T>,
		// not a nested PageEnvelope. The fix: `fromPage(komponenList.data)`.
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("profilId=3&page=1") as never);

		mockFetchByEndpoint({
			"/penggajian/profil/list": {
				data: [
					{ id: 3, nama: "Profil Komponen Capeg Tetap" },
					{ id: 1, nama: "Profil Direksi" },
				],
			},
			"/penggajian/komponen/3/profil": {
				data: {
					totalElements: 1,
					totalPages: 1,
					size: 10,
					number: 0,
					numberOfElements: 1,
					first: true,
					last: true,
					empty: false,
					content: [
						{
							id: 64,
							urut: 1,
							profilGaji: { id: 3, nama: "Profil Komponen Capeg Tetap" },
							kode: "GP",
							nama: "Gaji Pokok",
							jenisGaji: "PEMASUKAN",
							nilai: 0,
							isReference: true,
							formula: "#SYSTEM",
						},
					],
				},
			},
		});

		renderWithProviders();

		await waitFor(() => {
			expect(screen.getByText("Gaji Pokok")).toBeInTheDocument();
		});

		expect(screen.getByText("GP")).toBeInTheDocument();
		expect(screen.getByText("PEMASUKAN")).toBeInTheDocument();
	});

	it("does not send profilId as a redundant query param", async () => {
		// Regression: useMasterSearchParams includes every non-pagination URL key in `filters`.
		// profilId is a path param here, so it must be excluded from the query string
		// (otherwise sent as `?profilId=3` alongside the path /komponen/3/profil).
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("profilId=3&page=1") as never);

		const fetchSpy = vi.fn().mockImplementation(async (input: string | URL | Request) => {
			const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
			if (s.includes("/penggajian/profil/list")) {
				return {
					ok: true,
					json: async () => ({ data: [{ id: 3, nama: "Profil Capeg Tetap" }] }),
				} as Response;
			}
			return {
				ok: true,
				json: async () => ({
					data: {
						totalElements: 0,
						totalPages: 0,
						size: 10,
						number: 0,
						numberOfElements: 0,
						first: true,
						last: true,
						empty: true,
						content: [],
					},
				}),
			} as Response;
		});
		globalThis.fetch = fetchSpy;

		renderWithProviders();

		await waitFor(() => {
			const componentCall = fetchSpy.mock.calls.find((args) => {
				const url = String(args[0]);
				return url.includes("/penggajian/komponen/3/profil");
			});
			expect(componentCall).toBeDefined();
		});

		const componentCall = fetchSpy.mock.calls.find((args) => {
			const url = String(args[0]);
			return url.includes("/penggajian/komponen/3/profil");
		});
		const url = String(componentCall?.[0] ?? "");
		expect(url).not.toMatch(/[?&]profilId=/);
	});
});
