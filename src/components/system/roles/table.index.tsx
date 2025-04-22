"use client";
import {
	type SystemRole,
	systemRoleTableColumns,
} from "@_types/system/system_role";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import RoleTableBody from "./table.body";
import { useSearchParams } from "next/navigation";
import SearchBuilder from "@components/builder/search";

const RoleTableComponent = () => {
	const params = useSearchParams();
	const query = useQuery({
		queryKey: ["roles", params.toString()],
		queryFn: async () =>
			await getPageData<SystemRole>({
				path: "system/roles",
				isRoot: true,
				searchParams: params.toString(),
			}),
	});
	return (
		<div className="rounder-md grid">
			<SearchBuilder columns={systemRoleTableColumns} />
			<Table>
				<TableHeadBuilder columns={systemRoleTableColumns} />
				{query.isLoading || query.error || !query.data || query.data.empty ? (
					<LoadingTable
						columns={systemRoleTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
						isEmpty={query.data?.empty}
					/>
				) : (
					<RoleTableBody data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
		</div>
	);
};

export default RoleTableComponent;
