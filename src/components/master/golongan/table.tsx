"use client";

import { type Golongan, golonganTableColumns } from "@_types/master/golongan";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import GolonganTableBody from "./table.body";

const GolonganTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["golongan", search.toString()],
		queryFn: () =>
			getPageDataEnc<Golongan>({
				path: encodeString("golongan"),
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
		</div>
	);
};

export default GolonganTable;
