"use client";

import {
	type JenisPelatihan,
	jenisPelatihanTableColumns,
} from "@_types/master/jenis_pelatihan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useJenisPelatihanStore } from "@src/store/master/jenis_pelatihan";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import JenisPelatihanTableBody from "./table.body";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";

const JenisPelatihanTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["jenis_pelatihan", search.toString()];
	const { selectedDataId, openDelete, setOpenDelete } = useJenisPelatihanStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isFetching, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<JenisPelatihan>({
				path: "jenis_pelatihan",
				searchParams: search.toString(),
			}),
	});
	return (
		<div className="max-w-full">
			<SearchBuilder
				columns={jenisPelatihanTableColumns}
				pending={isFetching || isLoading}
			/>

			<Table>
				<TableHeadBuilder columns={jenisPelatihanTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<JenisPelatihanTableBody data={data} />
				) : (
					<LoadingTable
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={jenisPelatihanTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/jenis-pelatihan"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</div>
	);
};

export default JenisPelatihanTable;
