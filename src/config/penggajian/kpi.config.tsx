import { z } from "zod";
import type { Column } from "@/components/data-table";
import { rupiah } from "@/lib/utils";
import type { GajiKpiResponse } from "@/types/penggajian/kpi";

export const KPI_COLUMNS: Column<GajiKpiResponse>[] = [
	{
		id: "nipam",
		header: "NIPAM",
		primary: true,
		sortable: true,
		cell: (item) => <span className="font-semibold tabular-nums">{item.nipam ?? "-"}</span>,
	},
	{
		id: "periode",
		header: "Periode",
		sortable: true,
		cell: (item) => <span className="tabular-nums">{item.periode ?? "-"}</span>,
	},
	{
		id: "tunkin",
		header: "Tunjangan Kinerja",
		sortable: true,
		align: "right",
		cell: (item) => <span className="tabular-nums">{rupiah(item.tunkin)}</span>,
	},
	{
		id: "pph21Ter",
		header: "PPh 21 TER",
		sortable: true,
		align: "right",
		cell: (item) => <span className="tabular-nums">{rupiah(item.pph21Ter)}</span>,
	},
];

export const kpiSchema = z.object({
	nipam: z.string().min(1, "NIPAM wajib diisi"),
	periode: z.string().min(6, "Periode wajib diisi"),
	tunkin: z.preprocess(
		(v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
		z
			.number({ required_error: "Tunjangan kinerja wajib diisi" })
			.positive("Tunjangan kinerja harus lebih besar dari 0"),
	),
	pph21Ter: z.preprocess(
		(v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
		z.number().min(0, "PPh 21 TER tidak boleh negatif").optional(),
	),
});

export type KpiFormValues = z.infer<typeof kpiSchema>;
