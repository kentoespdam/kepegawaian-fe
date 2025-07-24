"use client";

import type { FilterMutasiSchema, Mutasi } from "@_types/kepegawaian/mutasi";
import FilterMutasiComponent from "./filter";
import LapMutasiTable from "./table.index";

type LapMutasiComponent = {
	data?: Mutasi[];
} & FilterMutasiSchema;
const LapMutasiComponent = ({
	data,
	jenisMutasi,
	tglAwal,
	tglAkhir,
}: LapMutasiComponent) => {
	return (
		<div className="grid gap-8">
			<FilterMutasiComponent
				jenisMutasi={jenisMutasi}
				tglAwal={tglAwal}
				tglAkhir={tglAkhir}
			/>
			<LapMutasiTable data={data} />
		</div>
	);
};

export default LapMutasiComponent;
