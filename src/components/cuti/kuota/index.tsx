"use client";

import {
	type CutiKuotaPegawai,
	cutiKuotaSearchColumns,
	getCutiKuotaColumns,
} from "@_types/cuti/kuota";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CutiKuotaTable from "./table.body";
import CutiKuotaFormDialog from "./dialog.form";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import { useCutiKuotaStore } from "@store/cuti/kuota";

const CutiKuotaComponent = () => {
	const params = useSearchParams();
	const yearParam = params.get("tahun");
	const currentYear = yearParam ? Number(yearParam) : new Date().getFullYear();
	const search = new URLSearchParams(params);
	const qKey = ["cuti-kuota", search.toString()];

	const { selectedDataId, openDelete, setOpenDelete } = useCutiKuotaStore(
		(state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const { data, isFetching, isLoading, isError, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			globalGetDataEnc<CutiKuotaPegawai>({
				path: encodeString("cuti/kuota"),
				isRoot: true,
				searchParams: search.toString(),
			}),
	});
	return (
		<div className="grid">
			<SearchBuilder columns={cutiKuotaSearchColumns} />
			<Table>
				<TableHeadBuilder columns={getCutiKuotaColumns(currentYear)} />
				{isFetching || isLoading || isError || !data ? (
					<LoadingTable columns={12} isLoading={isLoading || isFetching} />
				) : (
					<CutiKuotaTable data={data} />
				)}
			</Table>
			<PaginationBuilder data={data?.page} />
			<CutiKuotaFormDialog />
			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="cuti/kuota"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default CutiKuotaComponent;
