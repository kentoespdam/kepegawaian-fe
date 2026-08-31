// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { KomponenClient } from "./komponen-client";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

function renderWithProviders() {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return render(
		<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:SETUP"]}>
			<QueryClientProvider client={qc}>
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
}	describe("KomponenClient", () => {
	const mockReplace = vi.fn();

	afterEach(() => cleanup());

	beforeEach(() => {
		vi.clearAllMocks();
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

	it("shows + Tambah button and opens dialog on click", async () => {
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);

		mockFetchByEndpoint({
			"/penggajian/profil/list": {
				data: [],
			},
		});

		renderWithProviders();

		await waitFor(() => {
			expect(screen.getByRole("heading", { name: "Profil Gaji" })).toBeInTheDocument();
		});

		const tambahBtn = screen.getByRole("button", { name: /\+ tambah/i });
		expect(tambahBtn).toBeInTheDocument();

		await userEvent.setup().click(tambahBtn);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Tambah Profil Gaji")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Nama profil gaji")).toBeInTheDocument();
	});

	it("sends POST to /penggajian/profil on form submit", async () => {
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);

		const fetchSpy = vi.fn().mockImplementation(async (input: string | URL | Request) => {
			const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
			if (s.includes("/penggajian/profil/list")) {
				return { ok: true, json: async () => ({ data: [] }) } as Response;
			}
			if (s === "/api/proxy/penggajian/profil" && !s.includes("/list")) {
				return {
					ok: true,
					json: async () => ({ data: { id: 99, nama: "Profil Baru" } }),
				} as Response;
			}
			return { ok: true, json: async () => ({ data: { content: [] } }) } as Response;
		});
		globalThis.fetch = fetchSpy;

		renderWithProviders();

		await waitFor(() => {
			expect(screen.getByRole("heading", { name: "Profil Gaji" })).toBeInTheDocument();
		});

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: /\+ tambah/i }));

		await user.type(screen.getByPlaceholderText("Nama profil gaji"), "Profil Baru");
		await user.click(screen.getByRole("button", { name: /simpan/i }));

		await waitFor(() => {
			const postCall = fetchSpy.mock.calls.find((args) => {
				const url = String(args[0]);
				return url === "/api/proxy/penggajian/profil";
			});
			expect(postCall).toBeDefined();
			const init = postCall?.[1] as RequestInit;
			expect(init.method).toBe("POST");
			expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
			expect(JSON.parse(String(init.body))).toEqual({ nama: "Profil Baru" });
		});
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
