import { z } from "zod";
import { EXCEL_TYPE, MAX_UPLOAD_SIZE, type CustomColumnDef } from "..";

export const VerifPhase2UploadSchema = z.object({
	id: z.string(),
	file: z
		.any()
		.refine(
			(files) => Array.from(files).every((file) => file instanceof File),
			"File wajib diisi",
		)
		.refine(
			(files) =>
				Array.from(files).every(
					(file) => file instanceof File && EXCEL_TYPE.includes(file.type),
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

export type VerifPhase2UploadSchema = z.infer<typeof VerifPhase2UploadSchema>;

export const verifPhase2Columns: CustomColumnDef[] = [
	{ id: "id", label: "" },
	{ id: "nipam", label: "NIK" },
	{ id: "nama", label: "Nama Pegawai", search: true, searchType: "text" },
	{ id: "jabatanId", label: "jabatan" },
	{ id: "penghasilanKotor", label: "Penghasilan" },
	{ id: "totalPotongan", label: "Potongan" },
	{ id: "pembulatan", label: "Pembulatan" },
	{ id: "penghasilanBersihFinal", label: "Jml. Gaji" },
	{ id: "totalAddTambahan", label: "Peng. Tambahan" },
	{ id: "totalAddPotongan", label: "Pot. Tambahan" },
	{ id: "penghasilanBersihFinal2", label: "Jml. Gaji Final" },
];
