/**
 * Enum options for dropdown/select throughout the app.
 * Single source of truth — digunakan oleh form, label lookup, dan filter.
 */
export const ENUMS = {
	jenisKelamin: [
		{ value: "LAKI_LAKI", label: "Laki-laki" },
		{ value: "PEREMPUAN", label: "Perempuan" },
	] as const,
	agama: [
		{ value: "ISLAM", label: "Islam" },
		{ value: "KRISTEN", label: "Kristen" },
		{ value: "KATOLIK", label: "Katolik" },
		{ value: "HINDU", label: "Hindu" },
		{ value: "BUDHA", label: "Budha" },
		{ value: "KONGHUCHU", label: "Konghuchu" },
		{ value: "ALIRAN_KEPERCAYAAN", label: "Aliran Kepercayaan" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
		{ value: "LAINNYA", label: "Lainnya" },
	] as const,
	hubunganKeluarga: [
		{ value: "SUAMI", label: "Suami" },
		{ value: "ISTRI", label: "Istri" },
		{ value: "AYAH", label: "Ayah" },
		{ value: "IBU", label: "Ibu" },
		{ value: "ANAK", label: "Anak" },
		{ value: "SAUDARA", label: "Saudara" },
	] as const,
	statusPendidikanKeluarga: [
		{ value: "BELUM_SEKOLAH", label: "Belum Sekolah" },
		{ value: "SEKOLAH", label: "Sekolah" },
		{ value: "SELESAI_SEKOLAH", label: "Selesai Sekolah" },
	] as const,
	statusKawin: [
		{ value: "BELUM_KAWIN", label: "Belum Kawin" },
		{ value: "KAWIN", label: "Kawin" },
		{ value: "JANDA_DUDA", label: "Janda/Duda" },
		{ value: "MENIKAH_SEKANTOR", label: "Menikah Sekantor" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
	] as const,
	golonganDarah: [
		{ value: "A", label: "A" },
		{ value: "B", label: "B" },
		{ value: "AB", label: "AB" },
		{ value: "O", label: "O" },
	] as const,
} as const;

type EnumArray = (typeof ENUMS)[keyof typeof ENUMS];

/**
 * Cari label dari value dalam array opsi enum.
 * Mengembalikan label jika ditemukan, value asli jika tidak, "-" jika null/undefined.
 */
export function labelFromValue(value: string | undefined | null, options: EnumArray): string {
	if (!value) return "-";
	return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Cari value dari label dalam array opsi enum (reverse lookup).
 * Mengembalikan value jika ditemukan, label asli jika tidak, "" jika null/undefined.
 */
export function valueFromLabel(label: string | undefined | null, options: EnumArray): string {
	if (!label) return "";
	return options.find((o) => o.label === label)?.value ?? label;
}
