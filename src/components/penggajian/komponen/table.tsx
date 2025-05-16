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
import { getPageData } from "@helpers/action";
import { useKomponenGajiStore } from "@store/penggajian/komponen";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import KomponenGajiTableBody from "./table.body";

interface KomponenGajiTableProps {
	profilId: number;
}
const KomponenGajiTable = ({ profilId }: KomponenGajiTableProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	search.delete("profilId");
	const { komponenGajiId, openDelete, setOpenDelete } = useKomponenGajiStore(
		useShallow((state) => ({
			komponenGajiId: state.komponenGajiId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);
	const { data, isFetching, isLoading, isError, error } = useQuery({
		queryKey: ["komponen_gaji", profilId, search.toString()],
		queryFn: async () =>
			getPageData<KomponenGaji>({
				path: `penggajian/komponen/${profilId}/profil`,
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
				queryKeys={["komponen_gaji", profilId]}
			/>
		</div>
	);
};

export default KomponenGajiTable;
