"use client";
import type { Biodata } from "@_types/profil/biodata";
import { type Keahlian, keahlianTableColumns } from "@_types/profil/keahlian";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormKeahlianDialog from "./dialog.form";
import KeahlianTableBody from "./table.body";

interface ProfilKeahlianContentComponentProps {
	biodata: Biodata;
}
const ProfilKeahlianContentComponent = ({
	biodata,
}: ProfilKeahlianContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { nik } = biodata;

	const { keahlianId, openDelete, setOpenDelete } = useKeahlianStore(
		(state) => ({
			keahlianId: state.keahlianId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["profil-keahlian", nik, search.toString()];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Keahlian>({
				path: encodeString(`profil/keahlian/${nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={keahlianTableColumns} />
				{data && !data.empty ? (
					<KeahlianTableBody biodata={biodata} data={data} />
				) : (
					<LoadingTable columns={keahlianTableColumns} isLoading={isLoading || isFetching} />
				)}
			</Table>
			<PaginationBuilder data={data} />
			<FormKeahlianDialog />
			<DeleteZodDialogBuilder
				id={keahlianId}
				deletePath="profil/keahlian"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey, ["lampiran-keahlian", keahlianId]]}
			/>
		</div>
	);
};

export default ProfilKeahlianContentComponent;
