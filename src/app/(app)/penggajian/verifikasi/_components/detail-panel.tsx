import { Skeleton } from "@/components/ui/skeleton";
import { useBatchMasterProses } from "@/hooks/penggajian/useBatchMasterProses";
import { fmtRupiah } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse } from "@/types/penggajian/batch";

/* ─── KomponenTable: shared table for Penghasilan & Potongan ─── */

function KomponenTable({ items, emptyLabel }: { items: GajiBatchMasterProsesResponse[]; emptyLabel: string }) {
	const total = items.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);

	return (
		<div className="border rounded-md overflow-hidden bg-card text-xs">
			<table className="w-full border-collapse">
				<thead className="bg-primary text-primary-foreground font-semibold">
					<tr>
						<th className="py-1.5 px-2 text-center w-8 border-r border-primary-foreground/20">No</th>
						<th className="py-1.5 px-2 border-r border-primary-foreground/20 text-left">Komponen Gaji</th>
						<th className="py-1.5 px-2 text-right">Jumlah</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{items.length === 0 ? (
						<tr>
							<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
								{emptyLabel}
							</td>
						</tr>
					) : (
						items.map((item, idx) => (
							<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
								<td className="py-1.5 px-2 text-center text-muted-foreground">{idx + 1}</td>
								<td className="py-1.5 px-2 font-medium text-foreground">{item.nama ?? "-"}</td>
								<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
							</tr>
						))
					)}
				</tbody>
				{items.length > 0 && (
					<tfoot className="border-t-2 border-border font-bold bg-primary/10 text-primary">
						<tr>
							<td colSpan={2} className="py-1.5 px-2 text-right">
								Total
							</td>
							<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(total)}</td>
						</tr>
					</tfoot>
				)}
			</table>
		</div>
	);
}

/* ─── Detail Panel ─────────────────────────────────────────── */

export function PegawaiDetailKomponenPanel({ batchMasterId }: { batchMasterId: number }) {
	const { data: prosesList, isPending } = useBatchMasterProses(String(batchMasterId));

	if (isPending) {
		return (
			<div className="p-4 space-y-3">
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
			</div>
		);
	}

	const items = prosesList ?? [];
	const penghasilanList = items.filter((k) => k.jenisGaji === "PEMASUKAN");
	const potonganList = items.filter((k) => k.jenisGaji === "POTONGAN");

	return (
		<div className="p-3 space-y-4 max-h-150 overflow-y-auto">
			<div className="space-y-1.5">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
					Jenis: Penghasilan
				</div>
				<KomponenTable items={penghasilanList} emptyLabel="Tidak ada komponen penghasilan" />
			</div>
			<div className="space-y-1.5">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Jenis: Potongan</div>
				<KomponenTable items={potonganList} emptyLabel="Tidak ada komponen potongan" />
			</div>
		</div>
	);
}
