import { Calendar, Clock, User, Users } from "lucide-react";
import { STATUS_BADGE, STATUS_LABELS } from "@/config/penggajian/batch-list.config";
import type { GajiBatchRootResponse, StatusBatch } from "@/types/penggajian/batch";

export function BatchInfoCard({ batch }: { batch: GajiBatchRootResponse }) {
	const status = batch.status as StatusBatch | undefined;
	const tanggalProses = batch.tanggalProses
		? new Date(batch.tanggalProses).toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			})
		: "-";

	return (
		<div className="relative overflow-hidden rounded-xl border bg-card/75 backdrop-blur-sm p-4.5 shadow-sm transition-all">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-4 sm:gap-6">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Calendar className="size-5" />
						</div>
						<div>
							<span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Periode</span>
							<p className="text-base font-bold text-foreground tracking-tight">{batch.periode ?? "-"}</p>
						</div>
					</div>

					<div className="h-9 w-px bg-border hidden sm:block" />

					<div>
						<span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
							Status Batch
						</span>
						<div className="mt-0.5">
							{status ? (
								<span
									className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
										STATUS_BADGE[status] ?? "bg-primary/10 text-primary"
									}`}
								>
									<span className="size-1.5 rounded-full bg-current opacity-75" />
									{STATUS_LABELS[status] ?? status}
								</span>
							) : (
								"-"
							)}
						</div>
					</div>

					<div className="h-9 w-px bg-border hidden sm:block" />

					<div className="flex items-center gap-2.5">
						<Users className="size-4 text-muted-foreground" />
						<div>
							<span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
								Total Pegawai
							</span>
							<p className="text-sm font-semibold text-foreground">{batch.totalPegawai ?? 0} pegawai</p>
						</div>
					</div>

					<div className="h-9 w-px bg-border hidden sm:block" />

					<div className="flex items-center gap-2.5">
						<Clock className="size-4 text-muted-foreground" />
						<div>
							<span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
								Tanggal Proses
							</span>
							<p className="text-sm font-medium text-foreground">{tanggalProses}</p>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-border text-xs text-muted-foreground">
					<div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
						<User className="size-4" />
					</div>
					<div className="text-right">
						{batch.diProsesOleh && (
							<div className="text-left sm:text-right">
								<span className="text-muted-foreground">Diproses oleh: </span>
								<span className="font-medium text-foreground">{batch.diProsesOleh}</span>
							</div>
						)}
						{batch.jabatanPemroses && (
							<div className="text-left sm:text-right text-[11px] text-muted-foreground">({batch.jabatanPemroses})</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
