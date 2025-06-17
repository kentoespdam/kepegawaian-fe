"use client";
import type { Biodata } from "@_types/profil/biodata";
import {
	type PengalamanKerja,
	pengalamanKerjaTableColumns,
} from "@_types/profil/pengalaman_kerja";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormProfilPengalamanKerjaDialog from "../dialog/form-dialog";
import ProfilPengalamanKerjaTableBody from "./table/body";

const ProfilPengalamanKerjaContentComponent = ({ nik }: { nik: string }) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { pengalamanId, openDelete, setOpenDelete } = usePengalamanKerjaStore(
		(state) => ({
			pengalamanId: state.pengalamanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qBio = useQuery({
		queryKey: ["biodata", nik],
		queryFn: () =>
			getDataByIdEnc<Biodata>({
				path: encodeString("profil/biodata"),
				id: encodeString(nik),
				isRoot: true,
				isString: true,
			}),
		enabled: !!nik,
	});

	const qKey = ["pengalaman-kerja", nik, search.toString()];

	const query = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<PengalamanKerja>({
				path: encodeString(`profil/pengalaman/${qBio.data?.nik}/biodata`),
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
			<DeleteZodDialogBuilder
				id={pengalamanId}
				deletePath={"profil/pengalaman"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default ProfilPengalamanKerjaContentComponent;
