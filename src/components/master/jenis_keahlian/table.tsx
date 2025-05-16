"use client";

import {
	type JenisKeahlian,
	jenisKeahlianTableColumns,
} from "@_types/master/jenis_keahlian";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";
import { useJenisKeahlianStore } from "@src/store/master/jenis_keahlian";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import JenisKeahlianTableBody from "./table.body";

const JenisKeahlianTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qKey = ["jenis_jeahlian", search.toString()];

	const { selectedDataId, openDelete, setOpenDelete } = useJenisKeahlianStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isFetching, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<JenisKeahlian>({
				path: "jenis_keahlian",
				searchParams: search.toString(),
			}),
	});

	return (
		<>
			<Table>
				<TableHeadBuilder columns={jenisKeahlianTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<JenisKeahlianTableBody data={data} />
				) : (
					<LoadingTable
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={jenisKeahlianTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/jenis-keahlian"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</>
	);
};

export default JenisKeahlianTable;
