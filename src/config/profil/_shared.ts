/**
 * _shared — helper Zod untuk form profil (panel kanan dashboard).
 *
 * CrudForm bekerja dengan nilai string (select/number/date), sedangkan
 * request BE butuh boolean/number. Transform di sini menormalisasi
 * nilai form ke tipe request saat submit — ""/undefined di-drop ke undefined
 * agar payload tidak mengirim string kosong.
 */
import { z } from "zod";

/** Opsi Ya/Tidak untuk field boolean (CrudForm tidak punya checkbox). */
export const BOOL_OPTIONS = [
	{ value: "true", label: "Ya" },
	{ value: "false", label: "Tidak" },
];

/** String wajib (minLength 1 — selaras OpenAPI). */
export const reqStr = (msg: string) => z.string().min(1, msg);

/** Boolean wajib — select "true"/"false" → boolean. */
export const reqBool = z.enum(["true", "false"], "Wajib dipilih").transform((v) => v === "true");

/** String opsional — "" di-drop ke undefined. */
export const optStr = z
	.string()
	.optional()
	.transform((v) => (v === "" ? undefined : v)); /** Boolean opsional — ""/undefined di-drop ke undefined. */
export const optBool = z
	.enum(["", "true", "false"])
	.optional()
	.transform((v) => (v === "" || v === undefined ? undefined : v === "true"));

/** Number opsional (int32/double) — "" / undefined di-drop ke undefined.
 *  Menerima string (dari input form kosong/baru) MAUPUN number (dari defaultValues
 *  edit-mode — RHF mengembalikan nilai numerik asli, bukan string). */
export const optNum = z
	.union([z.string(), z.number()])
	.optional()
	.refine((v) => v === "" || v === undefined || !Number.isNaN(Number(v)), "Angka tidak valid")
	.transform((v) => (v === "" || v === undefined ? undefined : Number(v)));
