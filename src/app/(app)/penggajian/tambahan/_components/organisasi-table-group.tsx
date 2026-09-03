import { cn, fmtRupiah } from "@/lib/utils";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";

export interface OrganisasiTableGroupProps {
	orgName: string;
	rows: GajiBatchMasterResponse[];
	startNum: number;
	selectedBatchMasterId: number | null;
	onSelectRow: (id: number) => void;
}

export function OrganisasiTableGroup({
	orgName,
	rows,
	startNum,
	selectedBatchMasterId,
	onSelectRow,
}: OrganisasiTableGroupProps) {
	return (
		<>
			<tr className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wide">
				<td colSpan={11} className="py-2 px-3">
					{orgName}
				</td>
			</tr>
			{rows.map((row, i) => {
				const num = startNum + i;
				const isSelected = selectedBatchMasterId === row.id;
				return (
					<tr
						key={row.id}
						onClick={() => row.id != null && onSelectRow(row.id)}
						className={cn(
							"cursor-pointer transition-colors text-xs border-b border-border/60",
							isSelected
								? "bg-primary/15 font-medium text-foreground"
								: "hover:bg-accent/40 text-foreground/90 odd:bg-card even:bg-muted/20",
						)}
					>
						<td className="py-2 px-2 text-center text-muted-foreground font-mono">{num}</td>
						<td className="py-2 px-2.5 font-mono text-[11px]">{row.nipam ?? "-"}</td>
						<td className="py-2 px-2.5 font-medium">{row.nama ?? "-"}</td>
						<td className="py-2 px-2.5 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanKotor)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.totalPotongan)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.pembulatan)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanBersih)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums text-primary font-medium">
							{fmtRupiah(row.totalAddTambahan)}
						</td>
						<td className="py-2 px-2.5 text-right tabular-nums text-sky-600 dark:text-sky-400 font-medium">
							{fmtRupiah(row.totalAddPotongan)}
						</td>
						<td className="py-2 px-2.5 text-right tabular-nums font-semibold text-primary">
							{fmtRupiah(row.penghasilanBersihFinal)}
						</td>
					</tr>
				);
			})}
		</>
	);
}
