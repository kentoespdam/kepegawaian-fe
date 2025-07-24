"use client";

import type { Kontrak } from "@_types/laporan/kepegawaian/kontrak";
import FilterMonitorKontrak from "./filter";
import LapKontrakTable from "./table.index";
import { Separator } from "@components/ui/separator";

type LapKontrakComponentProps = {
	data?: Kontrak[];
};
const LapKontrakComponent = ({ data }: LapKontrakComponentProps) => {
	return (
		<div className="grid gap-4">
			<FilterMonitorKontrak />
			<Separator />
			<LapKontrakTable data={data} />
		</div>
	);
};

export default LapKontrakComponent;
