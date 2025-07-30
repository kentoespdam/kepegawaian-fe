"use client";
import {
	type CutiPegawai,
	cutiPegawaiColumns,
} from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import BatalPengajuanCutiDialog from "./dialog.batal";
import PengajuanCutiFormDialog from "./dialog.form";
import CutiPengajuanInfoDialog from "./dialog.info";
import KlaimPengajuanCutiFormDialog from "./dialog.klaim.form";
import SisaCutiComponent from "./sisa.cuti";
import PengajuanCutiTableBody from "./table.body";

type PengajuanCutiComponentProps = {
	pegawai: PegawaiDetail;
};
const PengajuanCutiComponent = ({ pegawai }: PengajuanCutiComponentProps) => {
	const { replace } = useRouter();
	const params = useSearchParams();
	const tahun = params.get("tahun");

	const { cutiPegawai, openInfo, setOpenInfo } = usePengajuanCutiStore(
		(state) => ({
			cutiPegawai: state.cutiPegawai,
			openInfo: state.openInfo,
			setOpenInfo: state.setOpenInfo,
		}),
	);

	const qKeyPengajuan = ["pengajuan-cuti", pegawai.id, params.toString()];
	const qKeySisaCuti = ["sisa-cuti", pegawai.id, Number(tahun)];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKeyPengajuan,
		queryFn: async () =>
			await getPageDataEnc<CutiPegawai>({
				path: encodeString(`cuti/pengajuan/${pegawai.id}/pegawai`),
				isRoot: true,
				searchParams: params.toString(),
			}),
		enabled: !!pegawai.id && !!tahun,
	});

	const searchMemo = useMemo(() => {
		const search = new URLSearchParams(params);
		if (!tahun) {
			search.set("tahun", String(new Date().getFullYear()));
		}
		return search;
	}, [params, tahun]);

	useEffect(() => {
		if (!tahun) {
			replace(`?${searchMemo.toString()}`);
		}
	}, [tahun, searchMemo, replace]);

	return (
		<div className="grid max-w-full">
			<div className="flex gap-2 flex-col items-start md:flex-row md:justify-between lg:flex-row lg:justify-between">
				<SearchBuilder columns={cutiPegawaiColumns} />
				<SisaCutiComponent qKey={qKeySisaCuti} />
			</div>
			<Table className="mb-2">
				<TableHeadBuilder columns={cutiPegawaiColumns} />
				{!data || data.empty ? (
					<LoadingTable
						isLoading={isLoading || isFetching}
						columns={cutiPegawaiColumns.length}
					/>
				) : (
					<PengajuanCutiTableBody pegawai={pegawai} data={data} />
				)}
			</Table>
			<PaginationBuilder data={data} />
			<PengajuanCutiFormDialog pegawai={pegawai} />
			<BatalPengajuanCutiDialog queryKeys={[qKeyPengajuan]} />
			<KlaimPengajuanCutiFormDialog qKey={qKeyPengajuan} />
			<CutiPengajuanInfoDialog
				cutiPegawai={cutiPegawai}
				openInfo={openInfo}
				setOpenInfo={setOpenInfo}
			/>
		</div>
	);
};

export default PengajuanCutiComponent;
