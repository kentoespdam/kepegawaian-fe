"use client";
import {
	riwayatSpTableColumns,
	type RiwayatSp,
} from "@_types/kepegawaian/riwayat-sp";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RiwayatSpTableBody from "../table/body";
import DeleteRiwayatSpDialog from "../form/delete-dialog";
type RiwayatSpComponentProps = {
	pegawaiId: number;
};
const RiwayatSpComponent = (props: RiwayatSpComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const query = useQuery({
		queryKey: ["riwayat-sp", props.pegawaiId, search.toString()],
		queryFn: async () => {
			const result = await getPageData<RiwayatSp>({
				path: `kepegawaian/riwayat/sp/pegawai/${props.pegawaiId}`,
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
					{query.isLoading || query.error || !query.data ? (
						<LoadingTable
							columns={riwayatSpTableColumns}
							isLoading={query.isLoading}
							error={query.error?.message}
						/>
					) : (
						<RiwayatSpTableBody pegawaiId={props.pegawaiId} data={query.data} />
					)}
				</Table>
			</div>
			<PaginationBuilder data={query.data} />
			<DeleteRiwayatSpDialog pegawaiId={props.pegawaiId} />
		</div>
	);
};

export default RiwayatSpComponent;
