"use client";

import {
	riwayatSkTableColumns,
	type RiwayatSk,
} from "@_types/kepegawaian/riwayat_sk";
import type { JenisSk } from "@_types/master/jenis_sk";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData, globalGetData } from "@helpers/action";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteRiwayatSkDialog from "../form/delete-dialog";
import RiwayatSkFormComponent from "../form/form.index";
import RiwayatSkTableBody from "../table/body";

type RiwayatSkContentComponentProps = {
	pegawaiId: number;
};
const RiwayatSkContentComponent = (props: RiwayatSkContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const queries = useQueries({
		queries: [
			{
				queryKey: ["riwayat-sk", props.pegawaiId, search.toString()],
				queryFn: () =>
					getPageData<RiwayatSk>({
						path: `kepegawaian/riwayat/sk/pegawai/${props.pegawaiId}`,
						isRoot: true,
						searchParams: search.toString(),
					}),
				enabled: !!props.pegawaiId,
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
						queries[1].isLoading ||
						queries[1].isFetching ? (
						<LoadingTable columns={riwayatSkTableColumns} isLoading={true} />
					) : queries[0].isError ? (
						<LoadingTable
							columns={riwayatSkTableColumns}
							isSuccess={false}
							error={queries[0].error?.message}
						/>
					) : queries[0].data && queries[1].data ? (
						<RiwayatSkTableBody
							pegawaiId={props.pegawaiId}
							data={queries[0].data}
							jenisSkList={queries[1].data}
						/>
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={queries[0].data} />
			<RiwayatSkFormComponent />
			<DeleteRiwayatSkDialog pegawaiId={props.pegawaiId} />
		</div>
	);
};

export default RiwayatSkContentComponent;
