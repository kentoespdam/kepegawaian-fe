"use client";
import type { Biodata } from "@_types/profil/biodata";
import {
	pengalamanKerjaTableColumns,
	type PengalamanKerja,
} from "@_types/profil/pengalaman_kerja";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataById, getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormProfilPengalamanKerjaDialog from "../dialog/form-dialog";
import ProfilPengalamanKerjaTableBody from "./table/body";
import DeletePengalamanKerjaDialog from "../dialog/delete-dialog";

const ProfilPengalamanKerjaContentComponent = ({ nik }: { nik: string }) => {
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
		queryKey: ["pengalaman-kerja", qBio.data?.nik, search.toString()],
		queryFn: () =>
			getPageData<PengalamanKerja>({
				path: `profil/pengalaman/${qBio.data?.nik}/biodata`,
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			<SearchBuilder columns={pengalamanKerjaTableColumns} />
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={pengalamanKerjaTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable
							columns={pengalamanKerjaTableColumns}
							isLoading={true}
						/>
					) : query.isError ? (
						<LoadingTable
							columns={pengalamanKerjaTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					) : qBio.data && query.data ? (
						<ProfilPengalamanKerjaTableBody
							data={query.data}
							biodata={qBio.data}
						/>
					) : null}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<FormProfilPengalamanKerjaDialog />
			<DeletePengalamanKerjaDialog />
		</div>
	);
};

export default ProfilPengalamanKerjaContentComponent;
