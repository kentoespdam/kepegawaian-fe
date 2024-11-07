"use client";

import {
	type RiwayatTerminasi,
	riwayatTerminasiColumns,
} from "@_types/kepegawaian/terminasi";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TerminatedTableBody from "./table/terminated-body";

const TerminatedComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const query = useQuery({
		queryKey: ["riwayat-terminasi", search.toString()],
		queryFn: async () =>
			await getPageData<RiwayatTerminasi>({
				path: "kepegawaian/riwayat/terminasi",
				searchParams: search.toString(),
				isRoot: true,
			}),
	});

	return (
		<>
			<SearchBuilder columns={riwayatTerminasiColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={riwayatTerminasiColumns} />
					{query.isLoading || query.error || !query.data || query.data.empty ? (
						<LoadingTable
							columns={riwayatTerminasiColumns}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<TerminatedTableBody data={query.data} />
					)}
				</Table>
				<PaginationBuilder data={query.data} />
			</div>
		</>
	);
};

export default TerminatedComponent;
