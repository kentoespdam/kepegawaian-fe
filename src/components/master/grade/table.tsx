"use client";

import { type Grade, gradeTableColumns } from "@_types/master/grade";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import GradeTableBody from "./table.body";

const GradeTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["grade", search.toString()],
		queryFn: () =>
			getPageDataEnc<Grade>({
				path: encodeString("grade"),
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
		</div>
	);
};

export default GradeTable;
