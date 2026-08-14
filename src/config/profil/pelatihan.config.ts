/**
 * pelatihan.config — CRUD self-service Data Pelatihan (panel kanan dashboard).
 * Endpoint self: POST/PUT/DELETE /profil/pelatihan — selalu masuk approval queue.
 * biodataId di-inject dari sesi (nik) di mutation hook, bukan dari form.
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { BOOL_OPTIONS, optBool, optStr, reqStr } from "./_shared";

/** Zod schema — nilai form string ditransform ke tipe request (boolean). */
export const pelatihanFormSchema = z.object({
	jenisPelatihanId: optStr,
	nama: reqStr("Nama pelatihan wajib diisi"),
	lembaga: reqStr("Lembaga wajib diisi"),
	tanggalMulai: reqStr("Tanggal mulai wajib diisi"),
	tanggalSelesai: reqStr("Tanggal selesai wajib diisi"),
	lulus: optBool,
	nilai: reqStr("Nilai wajib diisi"),
	ikatanDinas: optBool,
	tanggalAkhirIkatan: optStr,
	notes: optStr,
});

export const pelatihanFormFields: FormField[] = [
	{ name: "nama", label: "Nama Pelatihan", type: "text", required: true },
	{ name: "lembaga", label: "Lembaga", type: "text", required: true },
	{ name: "jenisPelatihanId", label: "Jenis Pelatihan", type: "combobox", required: false },
	{ name: "tanggalMulai", label: "Tanggal Mulai", type: "date", required: true },
	{ name: "tanggalSelesai", label: "Tanggal Selesai", type: "date", required: true },
	{ name: "lulus", label: "Lulus", type: "select", required: false, options: BOOL_OPTIONS },
	{ name: "nilai", label: "Nilai", type: "text", required: true },
	{ name: "ikatanDinas", label: "Ikatan Dinas", type: "select", required: false, options: BOOL_OPTIONS },
	{ name: "tanggalAkhirIkatan", label: "Tanggal Akhir Ikatan", type: "date", required: false },
	{ name: "notes", label: "Catatan", type: "textarea", required: false },
];

export const pelatihanMutationUrl = {
	post: "/api/proxy/profil/pelatihan",
	put: (id: string | number) => `/api/proxy/profil/pelatihan/${id}`,
	delete: (id: string | number) => `/api/proxy/profil/pelatihan/${id}`,
};

export const pelatihanCrudConfig = {
	label: "Data Pelatihan",
	formSchema: pelatihanFormSchema,
	formFields: pelatihanFormFields,
	fkSources: [{ field: "jenisPelatihanId", entity: "jenis-pelatihan" }],
	defaultValues: (row: Record<string, unknown>) => ({
		jenisPelatihanId: String(row.jenisPelatihanId ?? ""),
		nama: String(row.nama ?? ""),
		lembaga: String(row.lembaga ?? ""),
		tanggalMulai: String(row.tanggalMulai ?? ""),
		tanggalSelesai: String(row.tanggalSelesai ?? ""),
		lulus: row.lulus == null ? "" : row.lulus ? "true" : "false",
		nilai: String(row.nilai ?? ""),
		ikatanDinas: row.ikatanDinas == null ? "" : row.ikatanDinas ? "true" : "false",
		tanggalAkhirIkatan: String(row.tanggalAkhirIkatan ?? ""),
		notes: String(row.notes ?? ""),
	}),
};
