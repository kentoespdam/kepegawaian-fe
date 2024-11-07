import { z } from "zod";
import { ACCEPTED_FILE_TYPES, type CustomColumnDef, MAX_UPLOAD_SIZE } from "..";

export interface LampiranSk {
	id: number;
	ref: string;
	refId: number;
	fileName: string;
	mimeType: string;
	notes: string;
	disetujui: boolean;
	disetujuiOleh: string;
	tanggalDisetujui: string;
}

export const LampiranSkSchema = z.object({
	id: z.number().optional().default(0),
	ref: z.string(),
	refId: z.number(),
	notes: z.string(),
	fileName: z
		.any()
		.refine(
			(files) => Array.from(files).every((file) => file instanceof File),
			"File wajib diisi",
		)
		.refine(
			(files) =>
				Array.from(files).every(
					(file) =>
						file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
				),
			"Invalid file type",
		)
		.refine(
			(files) =>
				Array.from(files).every(
					(file) => file instanceof File && file.size <= MAX_UPLOAD_SIZE,
				),
			"Maks File Upload 10 MB",
		),
});

export type LampiranSkSchema = z.TypeOf<typeof LampiranSkSchema>;

export const lampiranSkTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "fileName", label: "File" },
	{ id: "notes", label: "Keterangan" },
	{ id: "disetujui", label: "Disetujui" },
	{ id: "aksi", label: "Aksi" },
];
