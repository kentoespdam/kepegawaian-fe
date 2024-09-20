"use client";

import {
	riwayatMutasiTableColumns,
	type RiwayatMutasi,
} from "@_types/kepegawaian/riwayat-mutasi";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatMutasiTableBody from "../table/body";

type MutasiContentProps = {
	pegawaiId: number;
};
const MutasiContentComponent = (props: MutasiContentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const query = useQuery({
		queryKey: ["riwayat-mutasi", props.pegawaiId, search.toString()],
		queryFn: async () => {
			const result = await getPageData<RiwayatMutasi>({
				path: `kepegawaian/riwayat/mutasi/pegawai/${props.pegawaiId}`,
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
			<div className="min-h-90 overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatMutasiTableColumns} />
					{query.isLoading || query.error || !query.data ? (
						<LoadingTable
							columns={riwayatMutasiTableColumns}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<RiwayatMutasiTableBody
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

export default MutasiContentComponent;