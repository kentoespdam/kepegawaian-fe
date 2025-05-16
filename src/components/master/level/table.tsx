"use client";

import { type Level, levelTableColumns } from "@_types/master/level";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";
import { useLevelStore } from "@src/store/master/level";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import LevelTableBody from "./table.body";

const LevelTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qKey = ["level", search.toString()];

	const { selectedDataId, openDelete, setOpenDelete } = useLevelStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<Level>({ path: "level", searchParams: search.toString() }),
	});

	return (
		<>
			<Table>
				<TableHeadBuilder columns={levelTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<LevelTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={levelTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/level"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</>
	);
};

export default LevelTable;
