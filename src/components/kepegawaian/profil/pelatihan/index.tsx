"use client";
import type { Biodata } from "@_types/profil/biodata";
import {
	type Pelatihan,
	pelatihanTableColumns,
} from "@_types/profil/pelatihan";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormPelatihanDialog from "./dialog.form";
import PelatihanTableBody from "./table.body";

interface ProfilPelatihanContentProps {
	biodata: Biodata;
}
const ProfilPelatihanContentComponent = ({
	biodata,
}: ProfilPelatihanContentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { nik } = biodata;

	const { pelatihanId, openDelete, setOpenDelete } = usePelatihanStore(
		(state) => ({
			pelatihanId: state.pelatihanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["profil-pelatihan", nik, search.toString()];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Pelatihan>({
				path: encodeString(`profil/pelatihan/${nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={pelatihanTableColumns} />
				{data && !data.empty ? (
					<PelatihanTableBody biodata={biodata} data={data} />
				) : (
					<LoadingTable
						columns={pelatihanTableColumns}
						isLoading={isLoading || isFetching}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<FormPelatihanDialog />
			<DeleteZodDialogBuilder
				id={pelatihanId}
				deletePath="profil/pelatihan"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey, ["lampiran-pelatihan", pelatihanId]]}
			/>
		</div>
	);
};

export default ProfilPelatihanContentComponent;
