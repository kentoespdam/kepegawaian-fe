"use client";
import type { Biodata } from "@_types/profil/biodata";
import { pelatihanTableColumns, type Pelatihan } from "@_types/profil/pelatihan";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PelatihanTableBody from "./table/body";
import FormPelatihanDialog from "../dialog/form-dialog";
import DeletePelatihanDialog from "../dialog/delete-dialog";

interface ProfilPelatihanContentProps {
    nik: string
}
const ProfilPelatihanContentComponent = ({nik}: ProfilPelatihanContentProps) => {
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
		queryKey: ["profil-pelatihan", qBio.data?.nik, search.toString()],
		queryFn: () =>
			getPageData<Pelatihan>({
				path: `profil/pelatihan/${qBio.data?.nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			{/* <SearchBuilder columns={pelatihanTableColumns} /> */}
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={pelatihanTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable columns={pelatihanTableColumns} isLoading={true} />
					) : query.isError ? (
						<LoadingTable
							columns={pelatihanTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<PelatihanTableBody biodata={qBio.data} data={query.data} />
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormPelatihanDialog />
			<DeletePelatihanDialog />
		</div>
	);
};

export default ProfilPelatihanContentComponent;
