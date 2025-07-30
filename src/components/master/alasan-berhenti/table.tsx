"use client";

import {
	type AlasanBerhenti,
	alasanBerhentiTableColumns,
} from "@_types/master/alasan_berhenti";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import AlasanBerhentiTableBody from "./table.body";

const AlasanBerhentiTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["alasan_berhenti", search.toString()],
		queryFn: () =>
			getPageDataEnc<AlasanBerhenti>({
				path: encodeString("alasan_berhenti"),
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
		</div>
	);
};

export default AlasanBerhentiTable;
