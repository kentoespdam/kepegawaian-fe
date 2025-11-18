import type { JenjangPendidikan } from "@_types/master/jenjang_pendidikan";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";

export interface Pendidikan {
		id: number;
		biodata: BiodataMini;
		jenjangPendidikan: JenjangPendidikan;
		gelarDepan: string;
		gelarBelakang: string;
		jurusan: string;
		institusi: string;
		kota: string;
		tahunMasuk: number;
		tahunLulus: number;
		isLulus: boolean;
		gpa: number;
		isLatest: boolean;
	}

export const PendidikanSchema = z.object({
	id: z.number(),
	biodataId: z.string().min(16, "Biodata wajib diisi"),
	biodataName: z.string().optional(),
	jenjangPendidikanId: z.number().min(1, "Jenjang Pendidikan wajib diisi"),
	gelarDepan: z.string().optional(),
	gelarBelakang: z.string().optional(),
	jurusan: z.string().optional(),
	institusi: z.string().min(3, "Institusi wajib diisi"),
	kota: z.string().min(3, "Kota wajib diisi"),
	tahunMasuk: z.number(),
	tahunLulus: z.number(),
	isLulus: z.boolean(),
	gpa: z.number(),
	isLatest: z.boolean().default(false),
});

export type PendidikanSchema = z.infer<typeof PendidikanSchema>;

export const pendidikanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "action", label: "Action" },
	{
		id: "jenjangId",
		label: "Jenjang Pendidikan",
		search: true,
		searchType: "jenjangPendidikan",
	},
	{ id: "institusi", label: "Institusi", search: true, searchType: "text" },
	{ id: "jurusan", label: "Jurusan", search: true, searchType: "text" },
	{ id: "kota", label: "Kota", search: true, searchType: "text" },
	{ id: "tahunMasuk", label: "Tahun Masuk" },
	{ id: "tahunLulus", label: "Tahun Lulus" },
	{ id: "gpa", label: "GPA" },
	{ id: "isLulus", label: "Lulus?" },
	{ id: "gelarDepan", label: "Gelar Depan" },
	{ id: "gelarBelakang", label: "Gelar Belakang" },
	{ id: "isLatest", label: "terakhir" },
];
