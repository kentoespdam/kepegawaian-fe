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
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormProfilPengalamanKerjaDialog from "./dialog.form";
import ProfilPengalamanKerjaTableBody from "./table.body";

const ProfilPengalamanKerjaContentComponent = ({
	biodata,
}: { biodata: Biodata }) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { nik } = biodata;

	const { pengalamanId, openDelete, setOpenDelete } = usePengalamanKerjaStore(
		(state) => ({
			pengalamanId: state.pengalamanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["pengalaman-kerja", nik, search.toString()];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<PengalamanKerja>({
				path: encodeString(`profil/pengalaman/${nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-64 gap-0">
			<SearchBuilder columns={pengalamanKerjaTableColumns} />
			<div className="min-h-64">
				<Table>
					<TableHeadBuilder columns={pengalamanKerjaTableColumns} />
					{data && !data.empty ? (
						<ProfilPengalamanKerjaTableBody data={data} biodata={biodata} />
					) : (
						<LoadingTable
							columns={pengalamanKerjaTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
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
