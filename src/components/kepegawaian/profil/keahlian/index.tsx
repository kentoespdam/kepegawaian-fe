"use client";
import type { Biodata } from "@_types/profil/biodata";
import { type Keahlian, keahlianTableColumns } from "@_types/profil/keahlian";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FormKeahlianDialog from "./dialog.form";
import KeahlianTableBody from "./table.body";

interface ProfilKeahlianContentComponentProps {
	nik: string;
}
const ProfilKeahlianContentComponent = ({
	nik,
}: ProfilKeahlianContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { keahlianId, openDelete, setOpenDelete } = useKeahlianStore(
		(state) => ({
			keahlianId: state.keahlianId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["profil-keahlian", nik, search.toString()];

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
			getPageDataEnc<Keahlian>({
				path: encodeString(`profil/keahlian/${qBio.data?.nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: qBio.data && !!qBio.data.nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={keahlianTableColumns} />
				{query.isLoading ||
				query.isFetching ||
				query.isError ||
				!qBio.data ||
				!query.data ? (
					<LoadingTable columns={keahlianTableColumns} isLoading={true} />
				) : (
					<KeahlianTableBody biodata={qBio.data} data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
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
