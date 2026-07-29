/**
 * biodata.config — konfigurasi form edit biodata untuk dashboard.
 *
 * Dipisahkan dari SectionLeftPanel agar field definition & validasi bisa
 * dipakai ulang (mis. halaman profil mandiri, form HR lintas-pegawai).
 */
import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import { ENUMS } from "@/lib/enums";

/** Zod schema untuk form edit biodata. */
export const biodataFormSchema = z.object({
	nik: z.string().optional(),
	nama: z.string().min(1, "Nama wajib diisi"),
	jenisKelamin: z.string().optional(),
	tempatLahir: z.string().optional(),
	tanggalLahir: z.string().optional(),
	agama: z.string().optional(),
	statusKawin: z.string().optional(),
	ibuKandung: z.string().optional(),
	telp: z
		.string()
		.optional()
		.refine((v) => !v || /^[0-9+\-\s()]{7,20}$/.test(v), "Format nomor telepon tidak valid"),
	alamat: z.string().optional(),
});

/** Field definitions untuk form edit biodata (CrudForm). */
export const editFormFields: FormField[] = [
	{ name: "nik", label: "NIK", type: "text", required: false },
	{ name: "nama", label: "Nama", type: "text", required: true },
	{
		name: "jenisKelamin",
		label: "Jenis Kelamin",
		type: "select",
		required: false,
		options: [...ENUMS.jenisKelamin],
	},
	{ name: "tempatLahir", label: "Tempat Lahir", type: "text", required: false },
	{ name: "tanggalLahir", label: "Tanggal Lahir", type: "date", required: false },
	{ name: "agama", label: "Agama", type: "select", required: false, options: [...ENUMS.agama] },
	{
		name: "statusKawin",
		label: "Status Kawin",
		type: "select",
		required: false,
		options: [...ENUMS.statusKawin],
	},
	{ name: "ibuKandung", label: "Ibu Kandung", type: "text", required: false },
	{ name: "telp", label: "Telp", type: "text", required: false },
	{ name: "alamat", label: "Alamat", type: "textarea", required: false },
];
