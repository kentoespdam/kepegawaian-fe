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
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PengajuanCutiFormDialog from "./dialog.form";
import SisaCutiComponent from "./sisa.cuti";
import PengajuanCutiTableBody from "./table.body";
import BatalPengajuanCutiDialog from "./dialog.batal";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";

type PengajuanCutiComponentProps = {
	pegawai: PegawaiDetail;
};
const PengajuanCutiComponent = ({ pegawai }: PengajuanCutiComponentProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params.toString());
	const tahun = search.get("tahun") || new Date().getFullYear().toString();
	search.set("tahun", tahun);

	const { replace } = useRouter();

	const qKeyPengajuan = ["pengajuan-cuti", pegawai.id, search.toString()];
	const qKeySisaCuti = ["sisa-cuti", pegawai.id, Number(tahun)];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKeyPengajuan,
		queryFn: async () =>
			await getPageDataEnc<CutiPegawai>({
				path: encodeString(`cuti/pengajuan/${pegawai.id}/pegawai`),
				isRoot: true,
				searchParams: search.toString(),
			}),
	});

	useEffect(() => {
		if (!params.get("tahun")) replace(`/cuti/pengajuan?${search.toString()}`);
	}, [params, replace, search]);

	return (
		<div className="grid">
			<div className="flex gap-2 flex-col items-start md:flex-row md:justify-between lg:flex-row lg:justify-between">
				<SearchBuilder columns={cutiPegawaiColumns} />
				<SisaCutiComponent qKey={qKeySisaCuti} />
			</div>
			<Table>
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
		</div>
	);
};

export default PengajuanCutiComponent;
