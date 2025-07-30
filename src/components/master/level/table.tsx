"use client";

import { type Level, levelTableColumns } from "@_types/master/level";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import LevelTableBody from "./table.body";

const LevelTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["level", search.toString()],
		queryFn: async () =>
			await getPageDataEnc<Level>({
				path: encodeString("level"),
				searchParams: search.toString(),
			}),
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
		</>
	);
};

export default LevelTable;
