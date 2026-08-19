"use client";

import { Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SECTIONS } from "@/config/dashboard-sections";
import { ACCORDION_TRIGGER_AFF, useDashboardSections } from "@/hooks/useDashboardSections";
import { SectionCrudSlot } from "./section-crud-slot";

export function SectionRightPanel({ pegawaiId, nik }: { pegawaiId: number; nik: string | null }) {
	const { queries, onPageChange, onSizeChange, crudMap, fkOptions, openValues, setOpenValues, sizeMap } =
		useDashboardSections({ pegawaiId, nik });

	return (
		<div className="rounded-lg border bg-card shadow-sm">
			<Accordion className="px-5 py-1" value={openValues} onValueChange={setOpenValues} multiple>
				{SECTIONS.map((conf) => {
					const q = queries[conf.id];
					const hasPending = (q.data?.rows ?? []).some((r) => Boolean(r.changedStatus));
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
										conf={conf}
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
	);
}
