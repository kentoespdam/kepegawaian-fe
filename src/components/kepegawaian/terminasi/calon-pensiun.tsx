"use client";

import { calonPensiunColumns } from "@_types/kepegawaian/terminasi";
import type { Pegawai } from "@_types/pegawai";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CalonPensiunTableBody from "./table/calon-pensiun-body";

const CalonTerminasiComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const query = useQuery({
		queryKey: ["calon-pensiun", search.toString()],
		queryFn: async () =>
			await getPageData<Pegawai>({
				path: "kepegawaian/riwayat/terminasi/calon-pensiun",
				searchParams: search.toString(),
				isRoot: true,
			}),
	});

	return (
		<>
			<SearchBuilder columns={calonPensiunColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={calonPensiunColumns} />
					{query.isLoading || query.error || !query.data ? (
						<LoadingTable
							columns={calonPensiunColumns}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<CalonPensiunTableBody data={query.data} />
					)}
				</Table>
				<PaginationBuilder data={query.data} />
			</div>
		</>
	);
};

export default CalonTerminasiComponent;
