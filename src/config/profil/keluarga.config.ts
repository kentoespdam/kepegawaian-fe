/**
 * keluarga.config — CRUD self-service Data Keluarga (panel kanan dashboard).
 * Endpoint self: POST/PUT/DELETE /profil/keluarga — selalu masuk approval queue.
 * biodataId di-inject dari sesi (nik) di mutation hook, bukan dari form.
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { ENUMS } from "@/lib/enums";
import { BOOL_OPTIONS, optStr, reqBool, reqStr } from "./_shared";

/** Zod schema — nilai form string ditransform ke tipe request (boolean). */
export const keluargaFormSchema = z.object({
	nama: reqStr("Nama wajib diisi"),
	jenisKelamin: reqStr("Jenis kelamin wajib diisi"),
	agama: reqStr("Agama wajib diisi"),
	hubunganKeluarga: reqStr("Hubungan wajib diisi"),
	tempatLahir: reqStr("Tempat lahir wajib diisi"),
	tanggalLahir: reqStr("Tanggal lahir wajib diisi"),
	tanggungan: reqBool,
	statusKawin: reqBool,
	statusPendidikan: optStr,
	notes: optStr,
});

export const keluargaFormFields: FormField[] = [
	{ name: "nama", label: "Nama", type: "text", required: true },
	{ name: "jenisKelamin", label: "Jenis Kelamin", type: "select", required: true, options: [...ENUMS.jenisKelamin] },
	{ name: "agama", label: "Agama", type: "select", required: true, options: [...ENUMS.agama] },
	{
		name: "hubunganKeluarga",
		label: "Hubungan",
		type: "select",
		required: true,
		options: [...ENUMS.hubunganKeluarga],
	},
	{ name: "tempatLahir", label: "Tempat Lahir", type: "text", required: true },
	{ name: "tanggalLahir", label: "Tanggal Lahir", type: "date", required: true },
	{ name: "tanggungan", label: "Tanggungan", type: "select", required: true, options: BOOL_OPTIONS },
	{ name: "statusKawin", label: "Status Kawin", type: "select", required: true, options: BOOL_OPTIONS },
	{
		name: "statusPendidikan",
		label: "Status Pendidikan",
		type: "select",
		required: false,
		options: [...ENUMS.statusPendidikanKeluarga],
	},
	{ name: "notes", label: "Catatan", type: "textarea", required: false },
];

export const keluargaMutationUrl = {
	post: "/api/proxy/profil/keluarga",
	put: (id: string | number) => `/api/proxy/profil/keluarga/${id}`,
	delete: (id: string | number) => `/api/proxy/profil/keluarga/${id}`,
};

export const keluargaCrudConfig = {
	label: "Data Keluarga",
	formSchema: keluargaFormSchema,
	formFields: keluargaFormFields,
	fkSources: [],
	defaultValues: (row: Record<string, unknown>) => ({
		nama: String(row.nama ?? ""),
		jenisKelamin: String(row.jenisKelamin ?? ""),
		agama: String(row.agama ?? ""),
		hubunganKeluarga: String(row.hubunganKeluarga ?? ""),
		tempatLahir: String(row.tempatLahir ?? ""),
		tanggalLahir: String(row.tanggalLahir ?? ""),
		tanggungan: row.tanggungan == null ? "" : row.tanggungan ? "true" : "false",
		statusKawin: row.statusKawin == null ? "" : row.statusKawin ? "true" : "false",
		statusPendidikan: String(row.statusPendidikan ?? ""),
		notes: String(row.notes ?? ""),
	}),
};
