"use client";

import {
	riwayatKontrakTableColumns,
	type RiwayatKontrak,
} from "@_types/kepegawaian/riwayat_kontrak";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatKontrakTableBody from "../table/body";
import PaginationBuilder from "@components/builder/table/pagination";

type RiwayatKontrakComponentProps = {
	pegawaiId: number;
};
const RiwayatKontrakComponent = (props: RiwayatKontrakComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const query = useQuery({
		queryKey: ["riwayat-kontrak", props.pegawaiId, search.toString()],
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
					{query.isLoading || query.error || !query.data ? (
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
			{/* <RiwayatMutasiFormComponent /> */}
			{/* <RiwayatSkFormComponent />
			<DeleteRiwayatSkDialog pegawaiId={props.pegawaiId} /> */}
		</div>
	);
};

export default RiwayatKontrakComponent;
