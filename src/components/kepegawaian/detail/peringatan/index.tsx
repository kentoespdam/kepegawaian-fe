"use client";
import {
	type RiwayatSp,
	riwayatSpTableColumns,
} from "@_types/kepegawaian/riwayat-sp";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useRiwayatSpStore } from "@store/kepegawaian/detail/riwayat_sp";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatSpTableBody from "./table.body";
type RiwayatSpComponentProps = {
	pegawaiId: number;
};
const RiwayatSpComponent = (props: RiwayatSpComponentProps) => {
	const { riwayatSpId, openDelete, setOpenDelete } = useRiwayatSpStore();
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["riwayat-sp", props.pegawaiId, search.toString()];
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () => {
			const result = await getPageDataEnc<RiwayatSp>({
				path: encodeString(`kepegawaian/riwayat/sp/pegawai/${props.pegawaiId}`),
				searchParams: search.toString(),
				isRoot: true,
			});
			return result;
		},
		enabled: !!props.pegawaiId,
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatSpTableColumns} />
			<div className="min-h-60 overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatSpTableColumns} />
					{data && !data.empty ? (
						<RiwayatSpTableBody pegawaiId={props.pegawaiId} data={data} />
					) : (
						<LoadingTable
							columns={riwayatSpTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={riwayatSpId}
				deletePath="kepegawaian/riwayat/sp"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default RiwayatSpComponent;
