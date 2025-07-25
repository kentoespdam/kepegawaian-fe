"use client";
import type { Biodata } from "@_types/profil/biodata";
import {
	type KartuIdentitas,
	kartuIdentitasTableColumns,
} from "@_types/profil/kartu_identitas";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteKartuIdentitasDialog from "./dialog.delete";
import FormKartuIdentitasDialog from "./dialog.form";
import KartuIdentitasTableBody from "./table.body";
interface ProfilKartuIdentitasContentProps {
	biodata: Biodata;
}
const ProfilKartuIdentitasContentComponent = ({
	biodata,
}: ProfilKartuIdentitasContentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { nik } = biodata;

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["profil-kartu-identitas", nik, search.toString()],
		queryFn: async () =>
			await getPageDataEnc<KartuIdentitas>({
				path: encodeString(`profil/kartu-identitas/${nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			{/* <SearchBuilder columns={kartuIdentitasTableColumns} /> */}
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={kartuIdentitasTableColumns} />
					{data && !data.empty ? (
						<KartuIdentitasTableBody biodata={biodata} data={data} />
					) : (
						<LoadingTable
							columns={kartuIdentitasTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<FormKartuIdentitasDialog />
			<DeleteKartuIdentitasDialog />
		</div>
	);
};

export default ProfilKartuIdentitasContentComponent;
