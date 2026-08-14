/**
 * pengalaman-kerja.config — CRUD self-service Data Pengalaman Kerja (panel kanan dashboard).
 * Endpoint self: POST/PUT/DELETE /profil/pengalaman-kerja — selalu masuk approval queue.
 * biodataId di-inject dari sesi (nik) di mutation hook, bukan dari form.
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { optNum, optStr, reqStr } from "./_shared";

/** Zod schema — nilai form string ditransform ke tipe request (number). */
export const pengalamanKerjaFormSchema = z.object({
	namaPerusahaan: reqStr("Nama perusahaan wajib diisi"),
	typePerusahaan: optStr,
	jabatan: optStr,
	lokasi: optStr,
	tahunMasuk: optNum,
	tahunKeluar: optNum,
	notes: optStr,
});

export const pengalamanKerjaFormFields: FormField[] = [
	{ name: "namaPerusahaan", label: "Nama Perusahaan", type: "text", required: true },
	{ name: "typePerusahaan", label: "Tipe Perusahaan", type: "text", required: false },
	{ name: "jabatan", label: "Jabatan", type: "text", required: false },
	{ name: "lokasi", label: "Lokasi", type: "text", required: false },
	{ name: "tahunMasuk", label: "Tahun Masuk", type: "number", required: false },
	{ name: "tahunKeluar", label: "Tahun Keluar", type: "number", required: false },
	{ name: "notes", label: "Catatan", type: "textarea", required: false },
];

export const pengalamanKerjaMutationUrl = {
	post: "/api/proxy/profil/pengalaman-kerja",
	put: (id: string | number) => `/api/proxy/profil/pengalaman-kerja/${id}`,
	delete: (id: string | number) => `/api/proxy/profil/pengalaman-kerja/${id}`,
};

export const pengalamanKerjaCrudConfig = {
	label: "Data Pengalaman Kerja",
	formSchema: pengalamanKerjaFormSchema,
	formFields: pengalamanKerjaFormFields,
	fkSources: [],
	defaultValues: (row: Record<string, unknown>) => ({
		namaPerusahaan: String(row.namaPerusahaan ?? ""),
		typePerusahaan: String(row.typePerusahaan ?? ""),
		jabatan: String(row.jabatan ?? ""),
		lokasi: String(row.lokasi ?? ""),
		tahunMasuk: row.tahunMasuk ?? "",
		tahunKeluar: row.tahunKeluar ?? "",
		notes: String(row.notes ?? ""),
	}),
};
