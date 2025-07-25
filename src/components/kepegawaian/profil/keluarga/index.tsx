"use client";
import type { Biodata } from "@_types/profil/biodata";
import { type Keluarga, keluargaTableColumns } from "@_types/profil/keluarga";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormKeluargaDialog from "./dialog.form";
import KeluargaTableBody from "./table.body";

interface ProfilKeluargaContentComponentProps {
	biodata: Biodata;
}
const ProfilKeluargaContentComponent = ({
	biodata,
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
	const { nik } = biodata;

	const { data, isLoading, isFetching } = useQuery({
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
					{data && !data.empty ? (
						<KeluargaTableBody biodata={biodata} data={data} />
					) : (
						<LoadingTable
							columns={keluargaTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<FormKeluargaDialog />
			<DeleteZodDialogBuilder
				id={keluargaId}
				deletePath={"profil/keluarga"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[
					["profil-keluarga", nik],
					["lampiran-keluarga", keluargaId],
				]}
			/>
		</div>
	);
};

export default ProfilKeluargaContentComponent;
