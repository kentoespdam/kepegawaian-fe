/**
 * shared/api — wrapper response & pagination types
 *
 * Envelope<T>, Page<T>, PageEnvelope<T>, PageQuery — tipe lintas-domain
 * yang dipakai oleh semua module API.
 */

import type { HttpStatusText } from "./enums";

/** Wrapper standar semua response. Union: sukses (data + message) | error (errors). */
export type Envelope<T> =
	| { status: number; statusText?: HttpStatusText; message: string; data: T; errors?: never; timestamp?: string } // 2xx
	| {
			status: number;
			statusText?: HttpStatusText;
			message?: string;
			data?: never;
			errors: string | string[];
			timestamp?: string;
	  }; // error

export interface Page<T> {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: T[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageEnvelope<T> {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: Page<T>;
	timestamp?: string; // date-time
}

/** Query params pagination standar; di-extends oleh tiap {Entity}SearchParams. */
export interface PageQuery {
	page?: number; // int32
	size?: number; // int32
	sortBy?: string;
	sortDirection?: "asc" | "desc";
}

export interface SortObject {
	empty?: boolean;
	sorted?: boolean;
	unsorted?: boolean;
}

export interface PageableObject {
	offset?: number; // int64
	paged?: boolean;
	pageNumber?: number; // int32
	pageSize?: number; // int32
	sort?: SortObject;
	unpaged?: boolean;
}

export type SavedResultLong = Envelope<number>;
export type DeletedResult = Envelope<string>;
export type SingleResultInteger = Envelope<number>;
export type SavedResultString = Envelope<string>;
export type SavedResultListLong = Envelope<number[]>;
