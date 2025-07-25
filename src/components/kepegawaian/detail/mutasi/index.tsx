"use client";

import {
	type RiwayatMutasi,
	riwayatMutasiTableColumns,
} from "@_types/kepegawaian/riwayat-mutasi";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatMutasiTableBody from "./table.body";

type MutasiContentProps = {
	pegawaiId: number;
};
const MutasiContentComponent = (props: MutasiContentProps) => {
	const { riwayatMutasiId, openDelete, setOpenDelete } = useRiwayatMutasiStore(
		(state) => ({
			riwayatMutasiId: state.riwayatMutasiId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["riwayat-mutasi", props.pegawaiId, search.toString()];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () => {
			const result = await getPageDataEnc<RiwayatMutasi>({
				path: encodeString(
					`kepegawaian/riwayat/mutasi/pegawai/${props.pegawaiId}`,
				),
				searchParams: search.toString(),
				isRoot: true,
			});
			return result;
		},
		enabled: !!props.pegawaiId,
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatMutasiTableColumns} />
			<div className="min-h-fit overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatMutasiTableColumns} />
					{data && !data.empty ? (
						<RiwayatMutasiTableBody pegawaiId={props.pegawaiId} data={data} />
					) : (
						<LoadingTable
							columns={riwayatMutasiTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={riwayatMutasiId}
				deletePath="kepegawaian/riwayat/mutasi"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default MutasiContentComponent;
