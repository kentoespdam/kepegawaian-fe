"use client";

import { alasanBerhentiTableColumns, type AlasanBerhenti } from "@_types/master/alasan_berhenti";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import AlasanBerhentiTableBody from "./body";

const AlasanBerhentiTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const query = useQuery({
		queryKey: ["alasan_berhenti", search.toString()],
		queryFn: () =>
			getPageData<AlasanBerhenti>({
				path: "alasan_berhenti",
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounded-md">
			<Table>
				<TableHeadBuilder columns={alasanBerhentiTableColumns} />
                {query.isSuccess && query.data.content.length > 0 ? (
                    <AlasanBerhentiTableBody data={query.data} />
                ) : (
                    <LoadingTable
                        isLoading={query.isLoading}
                        error={query.error?.message}
                        isSuccess={query.isSuccess}
                        isEmpty={query.data?.content.length === 0}
                        columns={alasanBerhentiTableColumns}
                    />
                )}
			</Table>
		</div>
	);
};

export default AlasanBerhentiTable;
