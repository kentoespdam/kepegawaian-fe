"use client";

import {
	type AlasanBerhenti,
	alasanBerhentiTableColumns,
} from "@_types/master/alasan_berhenti";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import AlasanBerhentiTableBody from "./table.body";
import { useAlasanBerhentiStore } from "@src/store/master/alasan_berhenti";
import { useShallow } from "zustand/shallow";

const AlasanBerhentiTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qKey = ["alasan_berhenti", search.toString()];

	const { alasanTerminasiId, openDelete, setOpenDelete } =
		useAlasanBerhentiStore(
			useShallow((state) => ({
				alasanTerminasiId: state.alasanTerminasiId,
				openDelete: state.openDelete,
				setOpenDelete: state.setOpenDelete,
			})),
		);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<AlasanBerhenti>({
				path: "alasan_berhenti",
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounded-md">
			<Table>
				<TableHeadBuilder columns={alasanBerhentiTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<AlasanBerhentiTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={alasanBerhentiTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={alasanTerminasiId}
				deletePath="master/alasan-berhenti"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</div>
	);
};

export default AlasanBerhentiTable;
