import type { PegawaiMini } from "@_types/pegawai";
import { z } from "zod";
import {
	type CustomColumnDef,
	EXCEL_TYPE,
	MAX_UPLOAD_SIZE,
	type Pageable,
} from "..";

export interface CutiKuota {
	id: number;
	pegawai: PegawaiMini;
	tahun: number;
	kuota: number;
	kuotaTerpakai: number;
	kuotaTambahan: number;
	sisaKuota: number;
	expired: string;
}

export interface CutiKuotaPegawai {
	page: Pageable<CutiKuota>;
	additional: CutiKuota[];
}

export const CutiKuotaSchema = z.object({
	id: z.number(),
	pegawaiId: z.number().min(1, "Pegawai wajib diisi"),
	nipam: z.string(),
	nama: z.string(),
	statusPegawai: z.string(),
	jabatan: z.string(),
	tahun: z.number().min(2000, "Tahun wajib diisi"),
	kuota: z.number(),
	kuotaTambahan: z.number(),
	sisaKuota: z.number(),
	expired: z.string()
});

export type CutiKuotaSchema = z.infer<typeof CutiKuotaSchema>;

export const CutiKuotaImportSchema = z.object({
	tahun: z.number(),
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
		)
		.optional(),
});

export const getCutiKuotaColumns = (tahun: number) => {
	const cutiKuotaColums: CustomColumnDef[] = [
		{ id: "id", label: "No" },
		{ id: "id", label: "Action" },
		{ id: "pegawai.nipam", label: "Nipam", sortable: true },
		{ id: "pegawai.nama", label: "Nama", sortable: true },
		{ id: "pegawai.statusPegawai", label: "Status Pegawai" },
		{ id: "pegawai.jabatan.id", label: "Jabatan" },
		{ id: "kuota", label: `Kuota ${tahun}` },
		{ id: "kuotaTerpakai", label: `Terpakai ${tahun}`, sortable: true },
		{ id: "sisaKuota", label: `Sisa ${tahun}`, sortable: true },
		{ id: "kuota", label: `Kuota ${tahun - 1}` },
		{ id: "kuotaTerpakai", label: `Terpakai ${tahun - 1}` },
		{ id: "sisaKuota", label: `Sisa ${tahun - 1}` },
	];

	return cutiKuotaColums;
};

export const cutiKuotaSearchColumns: CustomColumnDef[] = [
	{ id: "tahun", label: "Tahun", search: true, searchType: "tahun" },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
];
