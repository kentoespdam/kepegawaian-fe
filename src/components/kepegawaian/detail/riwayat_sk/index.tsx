"use client";

import {
	riwayatSkTableColumns,
	type RiwayatSk,
} from "@_types/kepegawaian/riwayat_sk";
import type { JenisSk } from "@_types/master/jenis_sk";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData, globalGetData } from "@helpers/action";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatSkFormComponent from "./form.index";
import RiwayatSkTableBody from "./table.body";

type RiwayatSkContentComponentProps = {
	pegawaiId: number;
};
const RiwayatSkContentComponent = (props: RiwayatSkContentComponentProps) => {
	const { pegawaiId } = props;
	const { riwayatSkId, openDelete, setOpenDelete } = useRiwayatSkStore(
		(state) => ({
			riwayatSkId: state.riwayatSkId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["riwayat-sk", Number(pegawaiId), search.toString()];

	const queries = useQueries({
		queries: [
			{
				queryKey: qKey,
				queryFn: () =>
					getPageData<RiwayatSk>({
						path: `kepegawaian/riwayat/sk/pegawai/${pegawaiId}`,
						isRoot: true,
						searchParams: search.toString(),
					}),
				enabled: !!pegawaiId,
			},
			{
				queryKey: ["jenis_sk"],
				queryFn: () =>
					globalGetData<JenisSk[]>({
						path: "master/jenis-sk",
						isRoot: true,
					}),
			},
		],
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatSkTableColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={riwayatSkTableColumns} />
					{queries[0].isLoading ||
					queries[0].isFetching ||
					!queries[0].data ||
					queries[0].isError ||
					queries[0].data.empty ||
					queries[1].isLoading ||
					queries[1].isFetching ? (
						<LoadingTable
							columns={riwayatSkTableColumns}
							isLoading={true}
							error={JSON.stringify(queries[0].error)}
						/>
					) : queries[0].data && queries[1].data ? (
						<RiwayatSkTableBody
							pegawaiId={pegawaiId}
							data={queries[0].data}
							jenisSkList={queries[1].data}
						/>
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={queries[0].data} />
			<RiwayatSkFormComponent />
			<DeleteZodDialogBuilder
				id={riwayatSkId}
				queryKeys={qKey}
				deletePath={"kepegawaian/riwayat/sk"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
			/>
		</div>
	);
};

export default RiwayatSkContentComponent;
