/**
 * keahlian.config — CRUD self-service Data Keahlian (panel kanan dashboard).
 * Endpoint self: POST/PUT/DELETE /profil/keahlian — selalu masuk approval queue.
 * biodataId di-inject dari sesi (nik) di mutation hook, bukan dari form.
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { BOOL_OPTIONS, optBool, optNum, optStr, reqStr } from "./_shared";

/** Opsi enum TingkatKemampuan (src/types/_shared.ts): KURANG | BAIK | CUKUP. */
const TINGKAT_KEMAMPUAN_OPTIONS = [
	{ value: "KURANG", label: "Kurang" },
	{ value: "BAIK", label: "Baik" },
	{ value: "CUKUP", label: "Cukup" },
];

/** Zod schema — nilai form string ditransform ke tipe request (boolean/number). */
export const keahlianFormSchema = z.object({
	keahlianId: optStr,
	kualifikasi: reqStr("Kualifikasi wajib diisi"),
	sertifikasi: optBool,
	institusi: reqStr("Institusi wajib diisi"),
	tahun: optNum,
	masaBerlaku: optStr,
});

export const keahlianFormFields: FormField[] = [
	{ name: "keahlianId", label: "Jenis Keahlian", type: "combobox", required: false },
	{ name: "kualifikasi", label: "Kualifikasi", type: "select", required: true, options: TINGKAT_KEMAMPUAN_OPTIONS },
	{ name: "sertifikasi", label: "Sertifikasi", type: "select", required: false, options: BOOL_OPTIONS },
	{ name: "institusi", label: "Institusi", type: "text", required: true },
	{ name: "tahun", label: "Tahun", type: "number", required: false },
	{ name: "masaBerlaku", label: "Masa Berlaku", type: "text", required: false },
];

export const keahlianMutationUrl = {
	post: "/api/proxy/profil/keahlian",
	put: (id: string | number) => `/api/proxy/profil/keahlian/${id}`,
	delete: (id: string | number) => `/api/proxy/profil/keahlian/${id}`,
};

export const keahlianCrudConfig = {
	label: "Data Keahlian",
	formSchema: keahlianFormSchema,
	formFields: keahlianFormFields,
	fkSources: [{ field: "keahlianId", entity: "jenis-keahlian" }],
	defaultValues: (row: Record<string, unknown>) => {
		const jenis = row.jenisKeahlian as { id?: number } | undefined;
		return {
			keahlianId: String(jenis?.id ?? ""),
			kualifikasi: String(row.kualifikasi ?? ""),
			sertifikasi: row.sertifikasi == null ? "" : row.sertifikasi ? "true" : "false",
			institusi: String(row.institusi ?? ""),
			tahun: row.tahun ?? "",
			masaBerlaku: String(row.masaBerlaku ?? ""),
		};
	},
};
