// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePeriodeFilter } from "./usePeriodeFilter";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
	usePathname: vi.fn(),
}));

function asSp(str = "") {
	return new URLSearchParams(str) as unknown as ReturnType<typeof useSearchParams>;
}

describe("usePeriodeFilter", () => {
	const mockReplace = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useRouter).mockReturnValue({
			replace: mockReplace,
			push: vi.fn(),
			prefetch: vi.fn(),
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
		} as unknown as ReturnType<typeof useRouter>);
		vi.mocked(usePathname).mockReturnValue("/penggajian/verifikasi");
	});

	it("falls back to current year and month when no searchParams exist", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp());
		const now = new Date();
		const expectedYear = String(now.getFullYear());
		const expectedMonth = String(now.getMonth() + 1).padStart(2, "0");

		const { result } = renderHook(() => usePeriodeFilter());

		expect(result.current.year).toBe(expectedYear);
		expect(result.current.month).toBe(expectedMonth);
		expect(result.current.periode).toBe(`${expectedYear}${expectedMonth}`);
	});

	it("reads valid year and month from searchParams", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("year=2025&month=03"));

		const { result } = renderHook(() => usePeriodeFilter());

		expect(result.current.year).toBe("2025");
		expect(result.current.month).toBe("03");
		expect(result.current.periode).toBe("202503");
	});

	it("falls back to default if year or month in searchParams is invalid", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("year=not-a-year&month=99"));
		const now = new Date();
		const expectedYear = String(now.getFullYear());
		const expectedMonth = String(now.getMonth() + 1).padStart(2, "0");

		const { result } = renderHook(() => usePeriodeFilter());

		expect(result.current.year).toBe(expectedYear);
		expect(result.current.month).toBe(expectedMonth);
		expect(result.current.periode).toBe(`${expectedYear}${expectedMonth}`);
	});

	it("updates year via router.replace while preserving other search params", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("year=2026&month=08&other=val"));

		const { result } = renderHook(() => usePeriodeFilter());

		act(() => {
			result.current.setYear("2024");
		});

		expect(mockReplace).toHaveBeenCalledWith("/penggajian/verifikasi?year=2024&month=08&other=val");
	});

	it("updates month via router.replace", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("year=2026&month=08"));

		const { result } = renderHook(() => usePeriodeFilter());

		act(() => {
			result.current.setMonth("11");
		});

		expect(mockReplace).toHaveBeenCalledWith("/penggajian/verifikasi?year=2026&month=11");
	});

	it("updates both year and month via setPeriode", () => {
		vi.mocked(useSearchParams).mockReturnValue(asSp("year=2026&month=08"));

		const { result } = renderHook(() => usePeriodeFilter());

		act(() => {
			result.current.setPeriode("2025", "01");
		});

		expect(mockReplace).toHaveBeenCalledWith("/penggajian/verifikasi?year=2025&month=01");
	});
});
