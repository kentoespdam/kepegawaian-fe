import {
	type RiwayatSk,
	riwayatSkTableColumnsDashboard,
} from "@_types/kepegawaian/riwayat_sk";
import type { JenisSk } from "@_types/master/jenis_sk";
import type { PegawaiDetail } from "@_types/pegawai";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc, globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KananDataRiwayatSkTableBody from "./kanan.sk.table.body";

type KananDataRiwayatSkTableProps = {
	pegawai: PegawaiDetail;
};
const KananDataRiwayatSkTable = ({ pegawai }: KananDataRiwayatSkTableProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const qKey = ["riwayat-sk", pegawai.id, search.toString()];

	const queries = useQueries({
		queries: [
			{
				queryKey: qKey,
				queryFn: () =>
					getPageDataEnc<RiwayatSk>({
						path: encodeString(`kepegawaian/riwayat/sk/pegawai/${pegawai.id}`),
						isRoot: true,
						searchParams: search.toString(),
					}),
				enabled: !!pegawai.id,
			},
			{
				queryKey: ["jenis_sk"],
				queryFn: () =>
					globalGetDataEnc<JenisSk[]>({
						path: encodeString("master/jenis-sk"),
						isRoot: true,
					}),
			},
		],
	});

	return (
		<div className="grid p-2 gap-0">
			<SearchBuilder columns={riwayatSkTableColumnsDashboard} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={riwayatSkTableColumnsDashboard} />
					{queries[0].isLoading ||
					queries[0].isFetching ||
					!queries[0].data ||
					queries[0].isError ||
					queries[0].data.empty ||
					!queries[1].data ||
					queries[1].isLoading ||
					queries[1].isFetching ||
					(!queries[0].data && !queries[1].data) ? (
						<LoadingTable
							columns={riwayatSkTableColumnsDashboard}
							isLoading={true}
							error={JSON.stringify(queries[0].error)}
						/>
					) : (
						<KananDataRiwayatSkTableBody
							pegawaiId={pegawai.id}
							data={queries[0].data}
							jenisSkList={queries[1].data}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={queries[0].data} />
		</div>
	);
};

export default KananDataRiwayatSkTable;
