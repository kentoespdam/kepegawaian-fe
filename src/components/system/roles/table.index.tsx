"use client";
import {
	type SystemRole,
	systemRoleTableColumns,
} from "@_types/system/system_role";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RoleTableBody from "./table.body";

const RoleTableComponent = () => {
	const params = useSearchParams();
	const query = useQuery({
		queryKey: ["roles", params.toString()],
		queryFn: async () =>
			await getPageDataEnc<SystemRole>({
				path: encodeString("system/roles"),
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
