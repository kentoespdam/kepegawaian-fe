"use client";

import { type Grade, gradeTableColumns } from "@_types/master/grade";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import GradeTableBody from "./table.body";
import { useGradeStore } from "@src/store/master/grade";
import { useShallow } from "zustand/shallow";
import DeleteZodDialogBuilder from "@src/components/builder/button/delete-zod";

const GradeTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["grade", search.toString()];
	const { selectedDataId, openDelete, setOpenDelete } = useGradeStore(
		useShallow((state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<Grade>({
				path: "grade",
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounder-md">
			<Table>
				<TableHeadBuilder columns={gradeTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<GradeTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={gradeTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
            <DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="master/grade"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</div>
	);
};

export default GradeTable;
