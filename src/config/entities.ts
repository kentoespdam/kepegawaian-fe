/** Shared entity definitions for the Master module — single source of truth. */

export interface Entity {
	id: string;
	label: string;
}

export const MASTER_ENTITIES: Entity[] = [
	{ id: "golongan", label: "Golongan" },
	{ id: "grade", label: "Grade" },
	{ id: "level", label: "Level" },
	{ id: "organisasi", label: "Organisasi" },
	{ id: "jabatan", label: "Jabatan" },
	{ id: "profesi", label: "Profesi" },
	{ id: "sanksi", label: "Sanksi" },
	{ id: "jenjang-pendidikan", label: "Jenjang Pendidikan" },
	{ id: "jenis-keahlian", label: "Jenis Keahlian" },
	{ id: "jenis-kitas", label: "Jenis Kitas" },
	{ id: "jenis-pelatihan", label: "Jenis Pelatihan" },
	{ id: "jenis-sp", label: "Jenis SP" },
	{ id: "alasan-berhenti", label: "Alasan Berhenti" },
	{ id: "hari-libur", label: "Hari Libur" },
	{ id: "rumah-dinas", label: "Rumah Dinas" },
];
