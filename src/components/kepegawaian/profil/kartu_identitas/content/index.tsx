"use client";
import type { Biodata } from "@_types/profil/biodata";
import {
	kartuIdentitasTableColumns,
	type KartuIdentitas,
} from "@_types/profil/kartu_identitas";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteKartuIdentitasDialog from "../dialog/delete-dialog";
import FormKartuIdentitasDialog from "../dialog/form";
import KartuIdentitasTableBody from "./table/table-body";
interface ProfilKartuIdentitasContentProps {
	nik: string;
}
const ProfilKartuIdentitasContentComponent = ({
	nik,
}: ProfilKartuIdentitasContentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qBio = useQuery({
		queryKey: ["biodata", nik],
		queryFn: async () =>
			await getDataById<Biodata>({
				path: "profil/biodata",
				id: nik,
				isRoot: true,
			}),
		enabled: !!nik,
	});

	const query = useQuery({
		queryKey: ["profil-kartu-identitas", qBio.data?.nik, search.toString()],
		queryFn: async () =>
			await getPageData<KartuIdentitas>({
				path: `profil/kartu-identitas/${qBio.data?.nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			{/* <SearchBuilder columns={kartuIdentitasTableColumns} /> */}
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={kartuIdentitasTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable
							columns={kartuIdentitasTableColumns}
							isLoading={true}
						/>
					) : query.isError ? (
						<LoadingTable
							columns={kartuIdentitasTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<KartuIdentitasTableBody biodata={qBio.data} data={query.data} />
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormKartuIdentitasDialog />
			<DeleteKartuIdentitasDialog />
		</div>
	);
};

export default ProfilKartuIdentitasContentComponent;
