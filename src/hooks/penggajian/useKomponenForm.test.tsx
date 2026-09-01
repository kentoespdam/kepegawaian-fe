// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { appendKode, formatFormula, useKomponenForm } from "./useKomponenForm";

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

function mockFetchRoutes(routes: Record<string, unknown>) {
	return vi.fn().mockImplementation((url: string) => {
		const data = routes[url];
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ data }),
		});
	});
}

describe("appendKode", () => {
	it("appends to empty formula", () => {
		expect(appendKode("", "GAJI")).toBe("GAJI");
	});

	it("separates with space", () => {
		expect(appendKode("GAJI", "PJK")).toBe("GAJI PJK");
	});

	it("avoids double space", () => {
		expect(appendKode("GAJI ", "PJK")).toBe("GAJI PJK");
	});

	it("appends directly after opening paren", () => {
		expect(appendKode("GAJI + (", "PJK")).toBe("GAJI + (PJK");
	});
});

describe("formatFormula", () => {
	it("wraps operators with spaces", () => {
		expect(formatFormula("GAJI+PJK")).toBe("GAJI + PJK");
	});

	it("wraps parentheses with spaces", () => {
		expect(formatFormula("(GAJI)")).toBe("( GAJI )");
	});

	it("collapses repeated spaces", () => {
		expect(formatFormula("GAJI   +   PJK")).toBe("GAJI + PJK");
	});

	it("handles mixed operators and parens", () => {
		expect(formatFormula("(GAJI*PJK)/2")).toBe("( GAJI * PJK ) / 2");
	});

	it("trims leading/trailing whitespace", () => {
		expect(formatFormula("  GAJI + PJK  ")).toBe("GAJI + PJK");
	});

	it("returns empty string for empty input", () => {
		expect(formatFormula("")).toBe("");
	});
});

const KODE_ROUTES: Record<string, unknown> = {
	"/api/proxy/penggajian/komponen/1/kode": [
		{ kode: "GAJI", nama: "Gaji Pokok" },
		{ kode: "PJK", nama: "Pajak" },
		{ kode: "POT", nama: "Potongan" },
	],
	"/api/proxy/penggajian/komponen/1/profil/urut": 5,
};

describe("useKomponenForm", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("auto-fills urut on create mode", async () => {
		global.fetch = mockFetchRoutes(KODE_ROUTES);
		const { result } = renderHook(() => useKomponenForm(1, null), { wrapper });
		await waitFor(() => expect(result.current.form.urut).toBe("5"));
	});

	it("does not auto-fill urut when editing", async () => {
		global.fetch = mockFetchRoutes(KODE_ROUTES);
		const editing = { id: 10, kode: "GAJI", nama: "Gaji Pokok", urut: 3 };
		const { result } = renderHook(() => useKomponenForm(1, editing), { wrapper });
		await waitFor(() => expect(result.current.form.urut).toBe("3"));
	});

	it("excludes current komponen kode when editing", async () => {
		global.fetch = mockFetchRoutes(KODE_ROUTES);
		const editing = { id: 10, kode: "GAJI", nama: "Gaji Pokok", urut: 1 };
		const { result } = renderHook(() => useKomponenForm(1, editing), { wrapper });
		await waitFor(() => expect(result.current.availableKode).toHaveLength(2));
		expect(result.current.availableKode.map((k) => k.kode)).toEqual(["PJK", "POT"]);
	});

	it("shows all kode when not editing", async () => {
		global.fetch = mockFetchRoutes(KODE_ROUTES);
		const { result } = renderHook(() => useKomponenForm(1, null), { wrapper });
		await waitFor(() => expect(result.current.availableKode).toHaveLength(3));
	});
});
