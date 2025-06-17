"use client";

import {
	riwayatKontrakTableColumns,
	type RiwayatKontrak,
} from "@_types/kepegawaian/riwayat_kontrak";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatKontrakTableBody from "./table.kontrak.body";

type RiwayatKontrakComponentProps = {
	pegawaiId: number;
};
const RiwayatKontrakComponent = (props: RiwayatKontrakComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { riwayatKontrakId, openDelete, setOpenDelete } = useRiwayatKontrakStore(state => ({
		riwayatKontrakId: state.riwayatKontrakId,
		openDelete: state.openDelete,
		setOpenDelete: state.setOpenDelete,
	}))

	const qkey = ["riwayat-kontrak", props.pegawaiId, search.toString()]

	const query = useQuery({
		queryKey: qkey,
		queryFn: async () => {
			const result = await getPageData<RiwayatKontrak>({
				path: `kepegawaian/riwayat/kontrak/pegawai/${props.pegawaiId}`,
				searchParams: search.toString(),
				isRoot: true,
			});
			return result;
		},
		enabled: !!props.pegawaiId,
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatKontrakTableColumns} />
			<div className="min-h-90 overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatKontrakTableColumns} />
					{query.isLoading || query.error || !query.data || query.data.empty ? (
						<LoadingTable
							columns={riwayatKontrakTableColumns}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<RiwayatKontrakTableBody
							pegawaiId={props.pegawaiId}
							data={query.data}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<DeleteZodDialogBuilder
				id={riwayatKontrakId}
				deletePath="kepegawaian/riwayat/kontrak"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qkey]}
			/>
		</div>
	);
};

export default RiwayatKontrakComponent;
