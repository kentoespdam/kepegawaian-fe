import { z } from "zod";

/** Schema sanksi dengan conditional jmlPotTkk. */
export const sanksiSchema = z
	.object({
		kode: z.string().min(1, "Kode wajib diisi"),
		keterangan: z.string().min(1, "Keterangan wajib diisi"),
		jenisSpId: z.coerce.number(),
		potTkk: z.boolean(),
		jmlPotTkk: z.coerce.number().optional(),
		isPendingPangkat: z.boolean(),
		isPendingGaji: z.boolean(),
		isTurunPangkat: z.boolean(),
		isTurunJabatan: z.boolean(),
		isSuspension: z.boolean(),
		isTerminateDh: z.boolean(),
		isTerminateTh: z.boolean(),
	})
	.superRefine((data, ctx) => {
		if (data.potTkk && !data.jmlPotTkk) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["jmlPotTkk"],
				message: "Jumlah potong TKK wajib diisi saat potTkk aktif",
			});
		}
	});

export type SanksiFormValues = z.infer<typeof sanksiSchema>;

/** Switch field yang hanya boolean. */
export type SwitchField = keyof Pick<
	SanksiFormValues,
	| "potTkk"
	| "isPendingPangkat"
	| "isPendingGaji"
	| "isTurunPangkat"
	| "isTurunJabatan"
	| "isSuspension"
	| "isTerminateDh"
	| "isTerminateTh"
>;

export const SWITCH_LABELS: { field: SwitchField; label: string }[] = [
	{ field: "potTkk", label: "Potong TKK" },
	{ field: "isPendingPangkat", label: "Tunda kenaikan pangkat" },
	{ field: "isPendingGaji", label: "Tunda kenaikan gaji berkala" },
	{ field: "isTurunPangkat", label: "Turunkan pangkat" },
	{ field: "isTurunJabatan", label: "Turunkan jabatan" },
	{ field: "isSuspension", label: "Skorsing (suspension)" },
	{ field: "isTerminateDh", label: "PHK dengan hormat" },
	{ field: "isTerminateTh", label: "PHK tidak dengan hormat" },
];

/** Default values untuk edit — return Partial agar create mode boleh undefined. */
export function sanksiDefaults(editing: Record<string, unknown> | null): Partial<SanksiFormValues> {
	return {
		kode: String(editing?.kode ?? ""),
		keterangan: String(editing?.keterangan ?? ""),
		jenisSpId: Number(editing?.jenisSpId ?? 0) || undefined,
		potTkk: Boolean(editing?.potTkk ?? false),
		jmlPotTkk: Number(editing?.jmlPotTkk ?? 0) || undefined,
		isPendingPangkat: Boolean(editing?.isPendingPangkat ?? false),
		isPendingGaji: Boolean(editing?.isPendingGaji ?? false),
		isTurunPangkat: Boolean(editing?.isTurunPangkat ?? false),
		isTurunJabatan: Boolean(editing?.isTurunJabatan ?? false),
		isSuspension: Boolean(editing?.isSuspension ?? false),
		isTerminateDh: Boolean(editing?.isTerminateDh ?? false),
		isTerminateTh: Boolean(editing?.isTerminateTh ?? false),
	};
}
