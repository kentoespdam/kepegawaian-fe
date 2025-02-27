"use client";
import type { Biodata } from "@_types/profil/biodata";
import { keluargaTableColumns, type Keluarga } from "@_types/profil/keluarga";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteKeluargaDialog from "./dialog.delete";
import FormKeluargaDialog from "./dialog.form";
import KeluargaTableBody from "./table.body";

interface ProfilKeluargaContentComponentProps {
	nik: string;
}
const ProfilKeluargaContentComponent = ({
	nik,
}: ProfilKeluargaContentComponentProps) => {
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
		queryKey: ["profil-keluarga", nik, search.toString()],
		queryFn: () =>
			getPageData<Keluarga>({
				path: `profil/keluarga/${nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			{/* <SearchBuilder columns={keluargaTableColumns} /> */}
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={keluargaTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable columns={keluargaTableColumns} isLoading={true} />
					) : query.isError ? (
						<LoadingTable
							columns={keluargaTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<KeluargaTableBody biodata={qBio.data} data={query.data} />
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormKeluargaDialog />
			<DeleteKeluargaDialog />
		</div>
	);
};

export default ProfilKeluargaContentComponent;
