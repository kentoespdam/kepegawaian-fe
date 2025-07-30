"use client";

import {
	type RiwayatKontrak,
	riwayatKontrakTableColumns,
} from "@_types/kepegawaian/riwayat_kontrak";
import type { PegawaiDetail } from "@_types/pegawai";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatKontrakTableBody from "./table.kontrak.body";

type RiwayatKontrakComponentProps = {
	pegawai: PegawaiDetail;
};
const RiwayatKontrakComponent = (props: RiwayatKontrakComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { riwayatKontrakId, openDelete, setOpenDelete } =
		useRiwayatKontrakStore((state) => ({
			riwayatKontrakId: state.riwayatKontrakId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}));

	const qKey = ["riwayat-kontrak", props.pegawai.id, search.toString()];

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () => {
			const result = await getPageDataEnc<RiwayatKontrak>({
				path: encodeString(
					`kepegawaian/riwayat/kontrak/pegawai/${props.pegawai.id}`,
				),
				searchParams: search.toString(),
				isRoot: true,
			});
			return result;
		},
		enabled: !!props.pegawai.id,
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatKontrakTableColumns} />
			<div className="min-h-90 overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatKontrakTableColumns} />
					{data && !data.empty ? (
						<RiwayatKontrakTableBody pegawai={props.pegawai} data={data} />
					) : (
						<LoadingTable
							columns={riwayatKontrakTableColumns}
							isLoading={isLoading || isFetching}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={riwayatKontrakId}
				deletePath="kepegawaian/riwayat/kontrak"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default RiwayatKontrakComponent;
