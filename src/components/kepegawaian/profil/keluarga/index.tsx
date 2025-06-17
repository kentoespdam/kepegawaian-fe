"use client";
import type { Biodata } from "@_types/profil/biodata";
import { type Keluarga, keluargaTableColumns } from "@_types/profil/keluarga";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteKeluargaDialog from "./dialog.delete";
import FormKeluargaDialog from "./dialog.form";
import KeluargaTableBody from "./table.body";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";

interface ProfilKeluargaContentComponentProps {
	nik: string;
}
const ProfilKeluargaContentComponent = ({
	nik,
}: ProfilKeluargaContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { keluargaId, openDelete, setOpenDelete } = useKeluargaStore(
		(state) => ({
			keluargaId: state.keluargaId,
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
				isString: true,
				isRoot: true,
			}),
		enabled: !!nik,
	});

	const query = useQuery({
		queryKey: ["profil-keluarga", nik, search.toString()],
		queryFn: () =>
			getPageDataEnc<Keluarga>({
				path: encodeString(`profil/keluarga/${nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<div className="min-h-80">
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
			<DeleteZodDialogBuilder
				id={keluargaId}
				deletePath={"profil/keluarga"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[["profil-keluarga", nik],["lampiran-keluarga", keluargaId]]}
			/>
		</div>
	);
};

export default ProfilKeluargaContentComponent;
