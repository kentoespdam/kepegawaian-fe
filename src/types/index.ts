import { z } from "zod";

// export const USER_ROLE = { USER: "USER", ADMIN: "ADMIN" } as const;
// export const UserRole = z.nativeEnum(USER_ROLE);
// export type UserRole = z.infer<typeof UserRole>;

export const UserRole = z.object({
	id: z.string(),
});
export type UserRole = z.infer<typeof UserRole>;

export interface AxiosErrorData {
	message: string;
	code: number;
	type: string;
	version: string;
}

export const BaseId = z.object({
	id: z.number(),
});

export type BaseId = z.infer<typeof BaseId>;

export const BaseDelete = z.object({
	id: z.string().startsWith("DELETE-", {
		message: "invalid delete code!",
	}),
	curId: z.number().optional() || z.string().optional(),
	unique: z.string().optional(),
	otherId: z.number().optional() || z.string().optional(),
});

export type BaseDelete = z.infer<typeof BaseDelete>;
export interface BaseResult<TData> {
	status: number;
	statusText: string;
	message: string;
	data: TData;
	timestamp: string;
	errors?: string | string[];
}

export interface PageableSort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}

export interface BasePageable {
	pageNumber: number;
	pageSize: number;
	sort: PageableSort;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Pageable<TData> {
	content: TData[];
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: PageableSort;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

export interface PageResponse<TData> {
	status: number;
	statusText: string;
	message: string;
	data: Pageable<TData>;
	timestamp: string;
}

export const ESearchType = z.enum([
	"text",
	"number",
	"level",
	"organisasi",
	"jabatan",
	"profesi",
	"jenjangPendidikan",
	"jenisSk",
	"jenisMutasi",
	"alasanTerminasi",
	"grade",
	"jenisTunjangan",
	"golongan",
	"statusProsesGaji",
	"tahun",
	"approvalCutiStatus",
]);

export type BaseColumnDef = {
	id: string;
	label: string;
};

export type CustomColumnDef = BaseColumnDef & {
	search?: boolean;
	searchType?: z.infer<typeof ESearchType>;
	sortable?: boolean;
	baseSort?: string;
	width?: number;
};

export const DeleteSchema = z.object({
	deleteRef: z.string().startsWith("DELETE-", {
		message: "Input kode tidak sesuai!",
	}),
});

export interface SaveErrorStatus {
	success: boolean;
	error?: Record<string, string[]> | Record<string, string>;
	data?: string | Record<string, string[]> | Record<string, string>;
}

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
export const IMAGE_TYPE = ["image/png", "image/jpeg", "image/jpg"];
export const PDF_TYPE = ["application/pdf"];
export const EXCEL_TYPE = [
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export const DOC_TYPE = [
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const OFFICE_TYPE = EXCEL_TYPE.concat(DOC_TYPE);
export const ACCEPTED_FILE_TYPES =
	IMAGE_TYPE.concat(PDF_TYPE).concat(OFFICE_TYPE);
