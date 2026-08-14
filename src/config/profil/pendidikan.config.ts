/**
 * pendidikan.config — CRUD self-service Data Pendidikan (panel kanan dashboard).
 * Endpoint self: POST/PUT/DELETE /profil/pendidikan — selalu masuk approval queue.
 * biodataId di-inject dari sesi (nik) di mutation hook, bukan dari form.
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { BOOL_OPTIONS, optBool, optNum, optStr, reqStr } from "./_shared";

/** Zod schema — nilai form string ditransform ke tipe request (boolean/number). */
export const pendidikanFormSchema = z.object({
	jenjangPendidikanId: optStr,
	gelarDepan: optStr,
	gelarBelakang: optStr,
	institusi: reqStr("Institusi wajib diisi"),
	jurusan: optStr,
	kota: optStr,
	tahunMasuk: optNum,
	tahunLulus: optNum,
	gpa: optNum,
	isLulus: optBool,
	isLatest: optBool,
});

export const pendidikanFormFields: FormField[] = [
	{ name: "institusi", label: "Institusi", type: "text", required: true },
	{ name: "jenjangPendidikanId", label: "Jenjang Pendidikan", type: "combobox", required: false },
	{ name: "gelarDepan", label: "Gelar Depan", type: "text", required: false },
	{ name: "gelarBelakang", label: "Gelar Belakang", type: "text", required: false },
	{ name: "jurusan", label: "Jurusan", type: "text", required: false },
	{ name: "kota", label: "Kota", type: "text", required: false },
	{ name: "tahunMasuk", label: "Tahun Masuk", type: "number", required: false },
	{ name: "tahunLulus", label: "Tahun Lulus", type: "number", required: false },
	{ name: "gpa", label: "IPK/GPA", type: "number", required: false },
	{ name: "isLulus", label: "Lulus", type: "select", required: false, options: BOOL_OPTIONS },
	{ name: "isLatest", label: "Pendidikan Terakhir", type: "select", required: false, options: BOOL_OPTIONS },
];

export const pendidikanMutationUrl = {
	post: "/api/proxy/profil/pendidikan",
	put: (id: string | number) => `/api/proxy/profil/pendidikan/${id}`,
	delete: (id: string | number) => `/api/proxy/profil/pendidikan/${id}`,
};

export const pendidikanCrudConfig = {
	label: "Data Pendidikan",
	formSchema: pendidikanFormSchema,
	formFields: pendidikanFormFields,
	fkSources: [{ field: "jenjangPendidikanId", entity: "jenjang-pendidikan" }],
	defaultValues: (row: Record<string, unknown>) => {
		const jenjang = row.jenjangPendidikan as { id?: number } | undefined;
		return {
			jenjangPendidikanId: String(row.jenjangId ?? jenjang?.id ?? ""),
			gelarDepan: String(row.gelarDepan ?? ""),
			gelarBelakang: String(row.gelarBelakang ?? ""),
			institusi: String(row.institusi ?? ""),
			jurusan: String(row.jurusan ?? ""),
			kota: String(row.kota ?? ""),
			tahunMasuk: row.tahunMasuk ?? "",
			tahunLulus: row.tahunLulus ?? "",
			gpa: row.gpa ?? "",
			isLulus: row.isLulus == null ? "" : row.isLulus ? "true" : "false",
			isLatest: row.isLatest == null ? "" : row.isLatest ? "true" : "false",
		};
	},
};
