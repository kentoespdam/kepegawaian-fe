import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, type CustomColumnDef } from "..";

export interface LampiranProfil {
	id: number;
	ref: JenisLampiranProfil;
	refId: number;
	fileName: string;
	notes: string;
	mimeType: string;
	disetujui: boolean;
	disetujuiOleh: string;
	tanggalDisetujui: string;
}

export const LampiranProfilSchema = z.object({
	id: z.number(),
	ref: JenisLampiranProfil,
	refId: z.number().min(1, "Referensi wajib diisi"),
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
	notes: z.string(),
});

export type LampiranProfilSchema = z.infer<typeof LampiranProfilSchema>;

export const lampiranProfilTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "fileName", label: "File" },
	{ id: "notes", label: "Keterangan" },
	{ id: "disetujui", label: "Disetujui" },
	{ id: "aksi", label: "Aksi" },
];
