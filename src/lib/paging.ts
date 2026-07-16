import type { Page } from "@/lib/api/types";

/**
 * Seam translasi paging — satu-satunya tempat yang tahu backend 0-based
 * sedangkan URL/UI 1-based. Modul murni (tanpa React/URL/fetch) → unit-test tanpa mock.
 */

/** State paging manusiawi (1-based), sumber kebenaran = URL search params. */
export interface PageParams {
	page: number;
	size: number;
	sortBy?: string;
	sortDir?: "asc" | "desc";
	/** Filter tambahan dari URL (non-pagination keys), dilewatkan langsung ke kabel. */
	filters?: Record<string, string>;
}

/**
 * KIRIM: state UI 1-based → query params kabel 0-based.
 * `Math.max(0, …)` menjaga page 0/negatif dari URL rusak tak menembus jadi negatif.
 * Filter tambahan di-spread langsung ke output.
 */
export function toApiParams(p: PageParams): Record<string, string> {
	return {
		page: String(Math.max(0, p.page - 1)),
		size: String(p.size),
		...(p.sortBy && { sortBy: p.sortBy, sortDirection: p.sortDir ?? "asc" }),
		...(p.filters ?? {}),
	};
}

/** View-model paging untuk UI (page dikembalikan ke 1-based). */
export interface PageView<T> {
	rows: T[];
	total: number;
	totalPages: number;
	page: number;
	first: boolean;
	last: boolean;
}

/**
 * BACA: Spring `Page<T>` → view-model UI. Menyerap `undefined` (query pending)
 * jadi keadaan kosong yang aman, sehingga pemanggil tak perlu guard nullish.
 */
export function fromPage<T>(page: Page<T> | undefined | null): PageView<T> {
	if (!page) return { rows: [], total: 0, totalPages: 0, page: 1, first: true, last: true };
	return {
		rows: page.content ?? [],
		total: page.totalElements ?? 0,
		totalPages: page.totalPages ?? 0,
		page: (page.number ?? 0) + 1,
		first: page.first ?? true,
		last: page.last ?? true,
	};
}
