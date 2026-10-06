"use client";

import { Clock, FileText } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SECTIONS } from "@/config/dashboard-sections";
import { ACCORDION_TRIGGER_AFF, useDashboardSections } from "@/hooks/useDashboardSections";
import { SectionCrudSlot } from "./section-crud-slot";
import { SlipGajiPreviewDialog } from "./slip-gaji-preview-dialog";

export function SectionRightPanel({ pegawaiId, nik }: { pegawaiId: number; nik: string | null }) {
	const { queries, onPageChange, onSizeChange, crudMap, fkOptions, openValues, setOpenValues, sizeMap } =
		useDashboardSections({ pegawaiId, nik });

	const [previewBatchMasterId, setPreviewBatchMasterId] = useState<number | null>(null);
	const [previewPeriode, setPreviewPeriode] = useState<string | null>(null);
	const [previewOpen, setPreviewOpen] = useState(false);

	const handleOpenSlipGaji = (row: Record<string, unknown>) => {
		const id = (row.id as number) ?? (row.batchMasterId as number);
		const periode = row.periode as string;
		if (id) {
			setPreviewBatchMasterId(Number(id));
			setPreviewPeriode(periode ?? null);
			setPreviewOpen(true);
		}
	};

	return (
		<>
			<div className="rounded-[0.75rem] border bg-card p-1 shadow-2xl overflow-hidden">
				<Accordion className="px-5 py-1" value={openValues} onValueChange={setOpenValues} multiple>
					{SECTIONS.map((conf) => {
						const q = queries[conf.id];
						const hasPending = (q.data?.rows ?? []).some((r) => Boolean(r.changedStatus));

						// Jika section penggajian, tambahkan kustomisasi kolom aksi "Lihat Slip Gaji"
						const customConf =
							conf.id === "penggajian"
								? {
										...conf,
										columns: [
											...conf.columns,
											{
												id: "aksi-slip-gaji",
												header: "Aksi",
												align: "right" as const,
												cell: (row: Record<string, unknown>) => (
													<Button
														variant="outline"
														size="sm"
														className="h-8 gap-1.5 text-xs font-medium"
														onClick={(e) => {
															e.stopPropagation();
															handleOpenSlipGaji(row);
														}}
													>
														<FileText className="size-3.5 text-primary" />
														Slip Gaji
													</Button>
												),
											},
										],
									}
								: conf;

						return (
							<AccordionItem key={conf.id} value={conf.id}>
								<AccordionTrigger className={ACCORDION_TRIGGER_AFF}>
									<span className="inline-flex items-center gap-2">
										{conf.label}
										{conf.crudConfig && hasPending && (
											<Badge variant="outline" className="gap-1 text-warning border-warning/30 bg-warning/5">
												<Clock className="size-3" />
												Menunggu
											</Badge>
										)}
									</span>
								</AccordionTrigger>
								<AccordionContent>
									{openValues.includes(conf.id) && (
										<SectionCrudSlot
											conf={customConf}
											q={q}
											crud={crudMap[conf.id]}
											fkOptions={fkOptions}
											nik={nik}
											size={sizeMap[conf.id] ?? 5}
											onPageChange={(np) => onPageChange(conf.id, np)}
											onSizeChange={(ns) => onSizeChange(conf.id, ns)}
										/>
									)}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>

			<SlipGajiPreviewDialog
				open={previewOpen}
				onOpenChange={setPreviewOpen}
				batchMasterId={previewBatchMasterId}
				periode={previewPeriode}
			/>
		</>
	);
}
