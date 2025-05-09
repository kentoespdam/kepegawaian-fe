"use client";

import type { Biodata } from "@_types/profil/biodata";
import {
	pendidikanTableColumns,
	type Pendidikan,
} from "@_types/profil/pendidikan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeletePendidikanDialog from "./dialog.delete";
import FormProfilPendidikanDialog from "./dialog.form";
import ProfilPendidikanTableBody from "./table.body";

interface ProfilPendidikanContentComponentProps {
	nik: string;
}

const ProfilPendidikanContentComponent = ({
	nik,
}: ProfilPendidikanContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qBio = useQuery({
		queryKey: ["biodata", nik],
		queryFn: () =>
			getDataById<Biodata>({
				path: "profil/biodata",
				id: nik,
				isRoot: true,
			}),
		enabled: !!nik,
	});

	const query = useQuery({
		queryKey: ["profil-pendidikan", qBio.data?.nik, search.toString()],
		queryFn: () =>
			getPageData<Pendidikan>({
				path: `profil/pendidikan/${qBio.data?.nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			<SearchBuilder columns={pendidikanTableColumns} />
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={pendidikanTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable columns={pendidikanTableColumns} isLoading={true} />
					) : query.isError ? (
						<LoadingTable
							columns={pendidikanTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<ProfilPendidikanTableBody data={query.data} biodata={qBio.data} />
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormProfilPendidikanDialog />
			<DeletePendidikanDialog />
		</div>
	);
};

export default ProfilPendidikanContentComponent;
