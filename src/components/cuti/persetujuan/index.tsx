"use client";
import type { CutiApprovalChain } from "@_types/cuti/cuti.approval.chain";
import { cutiPegawaiApprovalColumns } from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePersetujuanCutiStore } from "@store/cuti/persetujuan";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import CutiPengajuanInfoDialog from "../pengajuan/dialog.info";
import PersetujuanCutiFormDialog from "./dialog.form";
import CutiPersetujuanTableBody from "./table.body";

type PersetujuanCutiComponentProps = {
	pegawai: PegawaiDetail;
};
const PersetujuanCutiComponent = ({
	pegawai,
}: PersetujuanCutiComponentProps) => {
	const { replace } = useRouter();
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const tahun = params.get("tahun");

	const { cutiPegawai, openInfo, setOpenInfo } = usePersetujuanCutiStore(
		(state) => ({
			cutiPegawai: state.cutiPegawai,
			openInfo: state.openInfo,
			setOpenInfo: state.setOpenInfo,
		}),
	);

	const qKeyPengajuan = [
		"pengajuan-cuti",
		`picSaatIniId=${pegawai.jabatan.id}&${search.toString()}`,
	];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKeyPengajuan,
		queryFn: async () =>
			await getPageDataEnc<CutiApprovalChain>({
				path: encodeString("cuti/pengajuan/approval"),
				isRoot: true,
				searchParams: `picSaatIniId=${pegawai.jabatan.id}&${search.toString()}`,
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
				<SearchBuilder columns={cutiPegawaiApprovalColumns} />
			</div>
			<Table className="mb-2">
				<TableHeadBuilder columns={cutiPegawaiApprovalColumns} />
				{!data || data.empty ? (
					<LoadingTable
						isLoading={isLoading || isFetching}
						columns={cutiPegawaiApprovalColumns.length}
					/>
				) : (
					<CutiPersetujuanTableBody pegawai={pegawai} data={data} />
				)}
			</Table>
			<PaginationBuilder data={data} />
			<CutiPengajuanInfoDialog
				cutiPegawai={cutiPegawai}
				openInfo={openInfo}
				setOpenInfo={setOpenInfo}
			/>
			<PersetujuanCutiFormDialog qKey={qKeyPengajuan} />
			{/* <PengajuanCutiFormDialog pegawai={pegawai} />
			<BatalPengajuanCutiDialog queryKeys={[qKeyPengajuan]} />
			<KlaimPengajuanCutiFormDialog qKey={qKeyPengajuan} />
			<CutiPengajuanInfoDialog /> */}
		</div>
	);
};

export default PersetujuanCutiComponent;
