// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MONTH_OPTIONS, PeriodeFilter, PeriodeSelect } from "./periode-filter";

afterEach(() => {
	cleanup();
});

describe("MONTH_OPTIONS", () => {
	it("has 12 months with 2-digit values and clean Indonesian labels", () => {
		expect(MONTH_OPTIONS).toHaveLength(12);
		expect(MONTH_OPTIONS[0]).toEqual({ value: "01", label: "Januari" });
		expect(MONTH_OPTIONS[7]).toEqual({ value: "08", label: "Agustus" });
		expect(MONTH_OPTIONS[11]).toEqual({ value: "12", label: "Desember" });
	});
});

describe("PeriodeSelect", () => {
	it("renders month name in trigger instead of 2-digit value", () => {
		render(
			<PeriodeSelect
				month="08"
				year="2026"
				onMonthChange={vi.fn()}
				onYearChange={vi.fn()}
				label="Periode Gaji"
				required
			/>,
		);

		// Label with asterisk
		expect(screen.getByText(/Periode Gaji:/)).toBeInTheDocument();
		expect(screen.getByText("*")).toBeInTheDocument();

		// Trigger should display "Agustus" (not "08")
		expect(screen.getByRole("combobox", { name: /Pilih Bulan/i })).toHaveTextContent("Agustus");
		// Year trigger displays "2026"
		expect(screen.getByRole("combobox", { name: /Pilih Tahun/i })).toHaveTextContent("2026");
	});
});

describe("PeriodeFilter", () => {
	it("renders both select and search input", () => {
		const onSearchChange = vi.fn();

		render(
			<PeriodeFilter
				month="09"
				year="2026"
				onMonthChange={vi.fn()}
				onYearChange={vi.fn()}
				searchQuery="Budi"
				onSearchChange={onSearchChange}
				showSearch
			/>,
		);

		expect(screen.getByRole("combobox", { name: /Pilih Bulan/i })).toHaveTextContent("September");
		const searchInput = screen.getByPlaceholderText("Cari Nama / NIPAM…");
		expect(searchInput).toHaveValue("Budi");

		fireEvent.change(searchInput, { target: { value: "Siti" } });
		expect(onSearchChange).toHaveBeenCalledWith("Siti");
	});
});
