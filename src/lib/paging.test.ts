import { describe, expect, it } from "vitest";
import type { Page } from "@/lib/api/types";
import { fromPage, toApiParams } from "@/lib/paging";

describe("toApiParams — UI 1-based → wire 0-based", () => {
  it("halaman pertama (page=1) menjadi page=0 di kabel", () => {
    // Ini inti bug asli: FE kirim page=1, backend anggap skip 1 halaman → kosong.
    expect(toApiParams({ page: 1, size: 10 })).toEqual({ page: "0", size: "10" });
  });

  it("menggeser tiap halaman turun satu", () => {
    expect(toApiParams({ page: 4, size: 20 }).page).toBe("3");
  });

  it("menjepit page rusak (0/negatif dari URL) ke 0, tidak pernah negatif", () => {
    expect(toApiParams({ page: 0, size: 10 }).page).toBe("0");
    expect(toApiParams({ page: -5, size: 10 }).page).toBe("0");
  });

  it("menyertakan sort hanya bila sortBy ada, default arah asc", () => {
    expect(toApiParams({ page: 1, size: 10, sortBy: "nama" })).toMatchObject({ sortDirection: "asc" });
    expect(toApiParams({ page: 1, size: 10, sortBy: "nama", sortDir: "desc" }).sortDirection).toBe("desc");
    expect(toApiParams({ page: 1, size: 10 })).not.toHaveProperty("sortBy");
  });
});

describe("fromPage — Spring Page<T> → view-model UI", () => {
  const page: Page<{ id: number }> = {
    content: [{ id: 1 }, { id: 2 }],
    number: 0,
    size: 2,
    totalElements: 7,
    totalPages: 4,
    first: true,
    last: false,
    numberOfElements: 2,
    empty: false,
  };

  it("memetakan content→rows, totalElements→total, dan number 0-based→page 1-based", () => {
    expect(fromPage(page)).toEqual({
      rows: [{ id: 1 }, { id: 2 }],
      total: 7,
      totalPages: 4,
      page: 1,
      first: true,
      last: false,
    });
  });

  it("query pending (undefined) → keadaan kosong yang aman, page=1", () => {
    expect(fromPage(undefined)).toEqual({ rows: [], total: 0, totalPages: 0, page: 1, first: true, last: true });
  });
});
