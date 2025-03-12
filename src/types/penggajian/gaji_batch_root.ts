import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, type CustomColumnDef } from "..";

export interface GajiBatchRootErrorLogs {
	id: number;
	batchId: string;
	nipam: string;
	nama: string;
	notes: string;
}
export interface GajiBatchRoot {
	id: string;
	periode: string;
	status: string;
	totalPegawai: number;
	tanggalProses: string;
	diProsesOleh: string;
	jabatanPemroses: string;
	tanggalVerifikasiTahap1: string;
	diVerifikasiOlehTahap1: string;
	jabatanVerifikasiTahap1: string;
	tanggalVerifikasiTahap2: string;
	diVerifikasiOlehTahap2: string;
	jabatanVerifikasiTahap2: string;
	tanggalPersetujuan: string;
	diSetujuiOleh: string;
	jabatanPersetujuan: string;
	errorLogs: GajiBatchRootErrorLogs[];
	notes: string;
}

export const GajiBatchRootSchema = z.object({
	tahun: z.string(),
	bulan: z.string(),
	diProsesOleh: z.string(),
	jabatanPemroses: z.string(),
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
		)
		.optional(),
});

export type GajiBatchRootSchema = z.infer<typeof GajiBatchRootSchema>;

export const gajiBatchRootColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "periode", label: "Periode", search: true, searchType: "text" },
	{ id: "batchId", label: "Batch ID" },
	{
		id: "status",
		label: "Status",
		search: true,
		searchType: "statusProsesGaji",
	},
	{ id: "notes", label: "Notes" },
	{ id: "tanggalProses", label: "Tanggal Proses" },
	{ id: "totalPegawai", label: "Total Pegawai" },
	{ id: "tanggalVerifikasiTahap1", label: "Tanggal Verifikasi Tahap 1" },
	{ id: "tanggalVerifikasiTahap2", label: "Tanggal Verifikasi Tahap 2" },
	{ id: "tanggalPersetujuan", label: "Tanggal Persetujuan" },
];
