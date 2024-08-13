"use client";
import type { Biodata } from "@_types/profil/biodata";
import { keahlianTableColumns, type Keahlian } from "@_types/profil/keahlian";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormKeahlianDialog from "../dialog/form-dialog";
import KeahlianTableBody from "./table/table-body";
import DeleteKeahlianDialog from "../dialog/delete-dialog";

interface ProfilKeahlianContentComponentProps {
	nik: string;
}
const ProfilKeahlianContentComponent = ({
	nik,
}: ProfilKeahlianContentComponentProps) => {
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
		queryKey: ["profil-keahlian", qBio.data?.nik, search.toString()],
		queryFn: () =>
			getPageData<Keahlian>({
				path: `profil/keahlian/${qBio.data?.nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			{/* <SearchBuilder columns={keahlianTableColumns} /> */}
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={keahlianTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable columns={keahlianTableColumns} isLoading={true} />
					) : query.isError ? (
						<LoadingTable
							columns={keahlianTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<KeahlianTableBody biodata={qBio.data} data={query.data} />
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormKeahlianDialog />
			<DeleteKeahlianDialog />
		</div>
	);
};

export default ProfilKeahlianContentComponent;
