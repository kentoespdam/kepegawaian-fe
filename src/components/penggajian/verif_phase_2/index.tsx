"use client";

import {
	STATUS_PROSES_GAJI,
	getKeyStatusProsesGaji,
} from "@_types/enums/status_proses_gaji";
import type { Organisasi } from "@_types/master/organisasi";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { verifPhase2Columns } from "@_types/penggajian/verif_phase2";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { getNamaBulan } from "@helpers/tanggal";
import { useQuery } from "@tanstack/react-query";
import { FileSpreadsheetIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import VerifPhase2TableBody from "../gaji_batch_master/verif_phase_2/table.body";

interface VerifPhase2ComponentProps {
	organisasiList: Organisasi[];
}
const VerifPhase2Component = ({
	organisasiList,
}: VerifPhase2ComponentProps) => {
	const searchParams = useSearchParams();
	const periode = searchParams.get("periode");
	const tahun = periode?.substring(0, 4);
	const bulan = periode?.substring(4, 6);
	const search = new URLSearchParams(searchParams);
	search.set(
		"status",
		getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_2),
	);

	const qKey = ["gaji_batch_masters", search.toString()];

	const {
		data: gajiBatchMasters,
		isLoading,
		isFetching,
		isError,
	} = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await globalGetDataEnc<GajiBatchMaster[]>({
				path: encodeString("penggajian/batch/master"),
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="grid gap-2 pr-4">
			<div>
				<h2 className="flex">
					<FileSpreadsheetIcon className="w-5 h-5 mr-1" />
					Tambah Komponen Gaji [Periode{" "}
					<span className="ml-2 text-primary">
						{getNamaBulan(Number(bulan))} {tahun}
					</span>
					]
				</h2>
			</div>
			<SearchBuilder columns={verifPhase2Columns} />
			<div className="block max-h-[550px] min-h-[350px] overflow-y-auto">
				<table className="w-full">
					<TableHeadBuilder columns={verifPhase2Columns} />
					{isLoading || isFetching || isError || !gajiBatchMasters ? (
						<LoadingTable columns={verifPhase2Columns} isLoading={false} />
					) : (
						<VerifPhase2TableBody
							organisasiList={organisasiList}
							gajiBatchMasters={gajiBatchMasters}
						/>
					)}
				</table>
			</div>
		</div>
	);
};

export default VerifPhase2Component;
