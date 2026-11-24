import { describe, expect, it, vi } from "vitest";
import type { SoResponse } from "@/types/laporan/kepegawaian";
import { escapeHtml, exportHighDefChart, renderNodeContent, sanitizeOrgChartData } from "./org-chart-utils";

describe("sanitizeOrgChartData", () => {
	it("returns empty array when input is empty or has no root", () => {
		expect(sanitizeOrgChartData([])).toEqual([]);
		expect(sanitizeOrgChartData([{ id: 2, parentId: 1, namaJabatan: "Direktur" }])).toEqual([]);
	});

	it("filters out orphan nodes whose parentId does not exist", () => {
		const raw: SoResponse[] = [
			{ id: 1, parentId: null, namaJabatan: "Dewas" },
			{ id: 2, parentId: 1, namaJabatan: "Dirut" },
			{ id: 3, parentId: 2, namaJabatan: "Manajer" },
			{ id: 36, parentId: 33, namaJabatan: "Ka. Sub Bag (Orphan)" },
			{ id: 37, parentId: 125, namaJabatan: "Staf (Orphan)" },
		];

		const result = sanitizeOrgChartData(raw);

		expect(result).toHaveLength(3);
		expect(result.map((n) => n.id)).toEqual([1, 2, 3]);
		expect(result.some((n) => n.id === 36)).toBe(false);
		expect(result.some((n) => n.id === 37)).toBe(false);
	});

	it("recursively removes child nodes of orphan parents", () => {
		const raw: SoResponse[] = [
			{ id: 1, parentId: null, namaJabatan: "Dewas" },
			{ id: 2, parentId: 1, namaJabatan: "Dirut" },
			{ id: 36, parentId: 999, namaJabatan: "Orphan Parent" },
			{ id: 37, parentId: 36, namaJabatan: "Child of Orphan" },
		];

		const result = sanitizeOrgChartData(raw);

		expect(result).toHaveLength(2);
		expect(result.map((n) => n.id)).toEqual([1, 2]);
	});

	it("sets _expanded to true up to supervisor level (level <= 5)", () => {
		const raw: SoResponse[] = [
			{ id: 1, parentId: null, level: 1, namaJabatan: "Dewas" },
			{ id: 2, parentId: 1, level: 2, namaJabatan: "Dirut" },
			{ id: 3, parentId: 2, level: 3, namaJabatan: "Direktur" },
			{ id: 4, parentId: 3, level: 4, namaJabatan: "Manajer" },
			{ id: 5, parentId: 4, level: 5, namaJabatan: "Supervisor" },
			{ id: 6, parentId: 5, level: 6, namaJabatan: "Staf" },
		];

		const result = sanitizeOrgChartData(raw);

		expect(result).toHaveLength(6);
		expect(result.find((n) => n.id === 1)?._expanded).toBe(true);
		expect(result.find((n) => n.id === 2)?._expanded).toBe(true);
		expect(result.find((n) => n.id === 3)?._expanded).toBe(true);
		expect(result.find((n) => n.id === 4)?._expanded).toBe(true);
		expect(result.find((n) => n.id === 5)?._expanded).toBe(true);
		expect(result.find((n) => n.id === 6)?._expanded).toBe(false);
	});
});

describe("escapeHtml", () => {
	it("escapes html special characters", () => {
		expect(escapeHtml("<script>alert('xss')&\"test\"</script>")).toBe(
			"&lt;script&gt;alert(&#039;xss&#039;)&amp;&quot;test&quot;&lt;/script&gt;",
		);
		expect(escapeHtml(null)).toBe("");
		expect(escapeHtml(undefined)).toBe("");
	});
});

describe("renderNodeContent", () => {
	it("renders card for occupied position", () => {
		const html = renderNodeContent({
			id: 2,
			namaJabatan: "Direktur Utama",
			namaPegawai: "Budi Santoso",
			nipam: "12345",
			namaOrganisasi: "DIREKSI",
			isLowong: false,
		});

		expect(html).toContain("Direktur Utama");
		expect(html).toContain("Budi Santoso");
		expect(html).toContain("NIPAM: 12345");
		expect(html).not.toContain("(Jabatan Lowong)");
	});

	it("renders card for vacant position", () => {
		const html = renderNodeContent({
			id: 3,
			namaJabatan: "Supervisor Kosong",
			namaPegawai: null,
			nipam: null,
			namaOrganisasi: "SUB BAG",
			isLowong: true,
		});

		expect(html).toContain("Supervisor Kosong");
		expect(html).toContain("(Jabatan Lowong)");
	});
});

describe("exportHighDefChart", () => {
	it("handles null chart safely", () => {
		const onError = vi.fn();
		exportHighDefChart(null, { format: "pdf" }, { onError });
		expect(onError).not.toHaveBeenCalled();
	});

	it("reports error when svg element is missing in chart state", () => {
		const onError = vi.fn();
		const mockChart = {
			getChartState: () => ({ svg: null, centerG: null }),
		} as unknown as Parameters<typeof exportHighDefChart>[0];

		exportHighDefChart(mockChart, { format: "pdf" }, { onError });
		expect(onError).toHaveBeenCalledWith(expect.any(Error));
	});

	it("exports svg format without error", () => {
		const onSuccess = vi.fn();
		const onError = vi.fn();

		const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const centerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
		centerG.getBBox = () => ({ x: 0, y: 0, width: 500, height: 300 }) as DOMRect;

		const mockChart = {
			getChartState: () => ({
				svg: { node: () => svgEl },
				centerG: { node: () => centerG },
			}),
		} as unknown as Parameters<typeof exportHighDefChart>[0];

		const originalCreate = URL.createObjectURL;
		const originalRevoke = URL.revokeObjectURL;
		URL.createObjectURL = vi.fn(() => "blob:test");
		URL.revokeObjectURL = vi.fn();

		exportHighDefChart(mockChart, { format: "svg" }, { onSuccess, onError });

		expect(onError).not.toHaveBeenCalled();
		expect(onSuccess).toHaveBeenCalled();

		URL.createObjectURL = originalCreate;
		URL.revokeObjectURL = originalRevoke;
	});
});
