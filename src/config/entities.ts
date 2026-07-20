/** Shared entity definitions for the Master module — single source of truth. */

export interface Entity {
	id: string;
	label: string;
}

export const MASTER_ENTITIES: Entity[] = [
	{ id: "level", label: "Level" },
	{ id: "grade", label: "Grade" },
	{ id: "organisasi", label: "Organisasi" },
	{ id: "jabatan", label: "Jabatan" },
	{ id: "profesi", label: "Profesi" },
	{ id: "golongan", label: "Golongan" },
	{ id: "jenis-keahlian", label: "Jenis Keahlian" },
	{ id: "jenis-kitas", label: "Jenis Kartu Identitas" },
	{ id: "jenis-pelatihan", label: "Jenis Pelatihan" },
	{ id: "jenjang-pendidikan", label: "Jenjang Pendidikan" },
	{ id: "jenis-sp", label: "Jenis SP" },
	{ id: "sanksi", label: "Sanksi" },
	{ id: "alasan-berhenti", label: "Alasan Berhenti" },
	{ id: "rumah-dinas", label: "Rumah Dinas" },
	{ id: "hari-libur", label: "Hari Libur" },
];
