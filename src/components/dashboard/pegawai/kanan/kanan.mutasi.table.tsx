import {
	type RiwayatMutasi,
	riwayatMutasiTableColumnsDashboard,
} from "@_types/kepegawaian/riwayat-mutasi";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KananDataMutasiTableBody from "./kanan.mutasi.table.body";

type KananDataMutasiTableProps = {
	pegawaiId: number;
};
const KananDataMutasiTable = (props: KananDataMutasiTableProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["riwayat-mutasi", props.pegawaiId, search.toString()];

	const query = useQuery({
		queryKey: qKey,
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
		<div className="grid overflow-auto p-2 gap-0">
			<SearchBuilder columns={riwayatMutasiTableColumnsDashboard} />
			<div className="min-h-fit overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatMutasiTableColumnsDashboard} />
					{query.isLoading || query.error || !query.data || query.data.empty ? (
						<LoadingTable
							columns={riwayatMutasiTableColumnsDashboard}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<KananDataMutasiTableBody
							pegawaiId={props.pegawaiId}
							data={query.data}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
		</div>
	);
};

export default KananDataMutasiTable;
