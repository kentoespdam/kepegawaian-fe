import type { Agama } from "@_types/enums/agama";
import { HubunganKeluarga } from "@_types/enums/hubungan-keluarga";
import { JenisKelamin } from "@_types/enums/jenisKelamin";
import type { StatusKawin } from "@_types/enums/status_kawin";
import type { JenjangPendidikan } from "@_types/master/jenjang_pendidikan";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";
import type { StatusPendidikan } from "@_types/enums/status_pendidikan";

export interface Keluarga {
	id: number;
	biodata: BiodataMini;
	nik: string;
	nama: string;
	jenisKelamin: JenisKelamin;
	agama: Agama;
	hubunganKeluarga: HubunganKeluarga;
	tempatLahir: string;
	tanggalLahir: string;
	tanggungan: boolean;
	pendidikan: JenjangPendidikan | null;
	statusPendidikan: StatusPendidikan | null;
	statusKawin: StatusKawin;
	notes: string;
}

export const KeluargaSchema = z
	.object({
		id: z.number().default(0),
		biodataId: z.string().min(16, "Biodata wajib diisi"),
		nik: z.string().min(16, "NIK wajib diisi"),
		nama: z.string().min(3, "Nama wajib diisi"),
		jenisKelamin: JenisKelamin,
		agama: z.string().min(1, "Agama wajib diisi"),
		hubunganKeluarga: HubunganKeluarga,
		tempatLahir: z.string().min(3, "Tempat Lahir wajib diisi"),
		tanggalLahir: z.string().min(10, "Tgl. Lahir wajib diisi"),
		tanggungan: z.boolean().default(true),
		pendidikanId: z.number().default(0).optional(),
		statusPendidikan: z.string().default("SEKOLAH"),
		statusKawin: z.string().default("BELUM KAWIN"),
		notes: z.string().optional(),
	})
	.superRefine((val, ctx) => {
		const { hubunganKeluarga } = val;
		if (["SUAMI", "ISTRI"].includes(hubunganKeluarga)) {
			val.tanggungan = false;
		}
	});

export type KeluargaSchema = z.infer<typeof KeluargaSchema>;

export const keluargaTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "nik", label: "NIK" },
	{ id: "nama", label: "Nama" },
	{ id: "jenisKelamin", label: "Jenis Kelamin" },
	{ id: "hubunganKeluarga", label: "Hub. Keluarga" },
	{ id: "agama", label: "Agama" },
	{ id: "tempatLahir", label: "Tempat Lahir" },
	{ id: "tanggalLahir", label: "Tgl. Lahir" },
	{ id: "tanggungan", label: "Tanggungan" },
	{ id: "statusPendidikan", label: "Status Pendidikan" },
	{ id: "pendidikan", label: "Pendidikan" },
	{ id: "statusKawin", label: "Status Kawin" },
	{ id: "notes", label: "Catatan" },
];
