"use client";
import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb";
import LapKenaikanBerkalaTable from "./table.index";
import FilterKenaikanBerkala from "./filter";

type LapKenaikanBerkalaComponentProps = {
	filter: string;
	data?: KenaikanBerkala[];
};
const LapKenaikanBerkalaComponent = ({
	data,
	filter,
}: LapKenaikanBerkalaComponentProps) => {
	return (
		<div className="grid gap-4">
			<FilterKenaikanBerkala filter={filter} />
			<LapKenaikanBerkalaTable data={data} />
		</div>
	);
};

export default LapKenaikanBerkalaComponent;
