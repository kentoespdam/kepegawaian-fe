"use client";
import type { LepasTanggunganAnak } from "@_types/laporan/kepegawaian/lta";
import LtaFilter from "./filter";
import LapLtaTable from "./table.index";

export type LapLtaComponentProps = {
	filter: string;
	data?: LepasTanggunganAnak[];
};
const LapLtaComponent = ({ filter, data }: LapLtaComponentProps) => {
	return (
		<div className="grid gap-4">
			<LtaFilter filter={filter} />
			<LapLtaTable data={data} />
		</div>
	);
};

export default LapLtaComponent;
