"use client";

import {
	type JenisKitas,
	jenisKitasTableColumns,
} from "@_types/master/jenis_kitas";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useJenisKitasStore } from "@src/store/master/jenis_kitas";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import JenisKitasTableBody from "./table.body";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";

const JenisKitasTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["jenis_kitas", search.toString()];

	const { selectedDataId, openDelete, setOpenDelete } = useJenisKitasStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isFetching, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<JenisKitas>({
				path: "jenis_kitas",
				searchParams: search.toString(),
			}),
	});

	return (
		<>
			<Table>
				<TableHeadBuilder columns={jenisKitasTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<JenisKitasTableBody data={data} />
				) : (
					<LoadingTable
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={jenisKitasTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/jenis-kitas"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</>
	);
};

export default JenisKitasTable;
