"use client";

import {
	type KomponenGaji,
	komponentGajiColumns,
} from "@_types/penggajian/komponen";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKomponenGajiStore } from "@store/penggajian/komponen";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KomponenGajiTableBody from "./table.body";

interface KomponenGajiTableProps {
	profilId: number;
}
const KomponenGajiTable = ({ profilId }: KomponenGajiTableProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	search.delete("profilId");

	const qKey = ["komponen_gaji", profilId, search.toString()];
	const { komponenGajiId, openDelete, setOpenDelete } = useKomponenGajiStore(
		(state) => state,
	);
	const { data, isFetching, isLoading, isError, error } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<KomponenGaji>({
				path: encodeString(`penggajian/komponen/${profilId}/profil`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: profilId > 0,
	});

	return (
		<div className="w-full min-h-4 scroll-auto">
			<Table>
				<TableHeadBuilder columns={komponentGajiColumns} />
				{isFetching || isLoading || isError || !data ? (
					<LoadingTable
						columns={komponentGajiColumns}
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
					/>
				) : (
					<KomponenGajiTableBody data={data} />
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={komponenGajiId}
				deletePath="penggajian/komponen"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default KomponenGajiTable;
