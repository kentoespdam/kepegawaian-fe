"use client";

import { type Golongan, golonganTableColumns } from "@_types/master/golongan";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";
import { useGolonganStore } from "@src/store/master/golongan";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import GolonganTableBody from "./table.body";

const GolonganTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qKey = ["golongan", search.toString()];

	const { selectedDataId, openDelete, setOpenDelete } = useGolonganStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<Golongan>({
				path: "golongan",
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounder-md border">
			<Table>
				<TableHeadBuilder columns={golonganTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<GolonganTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={golonganTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/golongan"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</div>
	);
};

export default GolonganTable;
