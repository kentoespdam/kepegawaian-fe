import type { CustomColumnDef } from "@_types/index";
import DetailUpdateKeluarga from "@components/kepegawaian/profil/approval/detail/keluarga";
import DetailUpdatePendidikan from "@components/kepegawaian/profil/approval/detail/pendidikan";
import { z } from "zod";
import type { Keluarga } from "./keluarga";
import type { Pendidikan } from "./pendidikan";

export type ProfilUpdate = {
	id: number;
	nipam: string;
	nama: string;
	jabatan: string;
	reqDate: string;
	tableName: string;
	actionType: string;
	dataDescription: string;
	revId: number;
	approvalStatus: string;
	approvalDate: string;
	approvalPic: string;
};

export interface ProfileUpdateDetail<T> {
	profilUpdate: ProfilUpdate;
	latestRevision: T;
	previousRevision: T;
}

export const ProfilUpdateSchema = z.object({
	id: z.number(),
	approval: z.string(),
	pegawaiId: z.number(),
});

export type ProfilUpdateSchema = z.infer<typeof ProfilUpdateSchema>;

export const profilUpdateColumns: CustomColumnDef[] = [
	{ id: "id", label: "Urut" },
	{ id: "id", label: "Aksi" },
	{ id: "nipam", label: "Nipam" },
	{ id: "nama", label: "Nama" },
	{ id: "jabatan", label: "Jabatan" },
	{ id: "actionType", label: "Jenis Perubahan" },
	{ id: "dataDescription", label: "Keterangan" },
];

// Dynamic configuration
export type ComponentConfig<T> = {
	renderer: React.ComponentType<{ isNew: boolean; data: T }>;
	endpoint: string;
};

export type ComponentDataMap = {
	pendidikan: Pendidikan;
	keluarga: Keluarga;
};

export const COMPONENT_CONFIG: {
	[K in keyof ComponentDataMap]: ComponentConfig<ComponentDataMap[K]>;
} = {
	pendidikan: {
		renderer: DetailUpdatePendidikan as React.ComponentType<{
			isNew: boolean;
			data: ComponentDataMap["pendidikan"];
		}>,
		endpoint: "profil/profil-update/pendidikan",
	},
	keluarga: {
		renderer: DetailUpdateKeluarga as React.ComponentType<{
			isNew: boolean;
			data: ComponentDataMap["keluarga"];
		}>,
		endpoint: "profil/profil-update/keluarga",
	},
};

export type TableName = keyof typeof COMPONENT_CONFIG;

// Type inference untuk data berdasarkan tableName
export type InferDataType<T extends TableName> = T extends "pendidikan"
	? Pendidikan
	: T extends "keluarga"
		? Keluarga
		: never;
