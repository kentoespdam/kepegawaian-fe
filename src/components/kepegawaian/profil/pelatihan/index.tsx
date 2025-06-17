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
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormPelatihanDialog from "./dialog.form";
import PelatihanTableBody from "./table.body";

interface ProfilPelatihanContentProps {
	nik: string;
}
const ProfilPelatihanContentComponent = ({
	nik,
}: ProfilPelatihanContentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { pelatihanId, openDelete, setOpenDelete } = usePelatihanStore(
		(state) => ({
			pelatihanId: state.pelatihanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["profil-pelatihan", nik, search.toString()];

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

	const query = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Pelatihan>({
				path: encodeString(`profil/pelatihan/${qBio.data?.nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={pelatihanTableColumns} />
				{query.isLoading ||
				query.isFetching ||
				query.isError ||
				!qBio.data ||
				!query.data ? (
					<LoadingTable
						columns={pelatihanTableColumns}
						isLoading={query.isLoading || query.isFetching}
					/>
				) : (
					<PelatihanTableBody biodata={qBio.data} data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
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
