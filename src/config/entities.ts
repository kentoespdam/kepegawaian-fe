/** Shared entity definitions — single source of truth. */

export interface Entity {
	id: string;
	label: string;
	/** Custom URL path. Default: `/master/${id}` */
	href?: string;
	/**
	 * Custom RBAC gate utk sidebar — `PERMISSION.*` string, array of permissions (any-of),
	 * atau `null` = always visible. Default: `id` (entity master di-gate via MASTER_GATE).
	 */
	gate?: string | null;
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
