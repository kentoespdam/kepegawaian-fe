import {
	type RiwayatMutasi,
	riwayatMutasiTableColumnsDashboard,
} from "@_types/kepegawaian/riwayat-mutasi"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import KananDataMutasiTableBody from "./kanan.mutasi.table.body"
import { encodeString } from "@helpers/number"
import { useMemo } from "react"

type KananDataMutasiTableProps = {
	pegawaiId: number
}
const KananDataMutasiTable = ({ pegawaiId }: KananDataMutasiTableProps) => {
	const searchParams = useSearchParams()
	const qKey = useMemo(
		() => ["riwayat-mutasi", pegawaiId, searchParams.toString()],
		[pegawaiId, searchParams]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<RiwayatMutasi>({
				path: encodeString(
					`kepegawaian/riwayat/mutasi/pegawai/${pegawaiId}`
				),
				searchParams: searchParams.toString(),
				isRoot: true,
			}),
		enabled: !!pegawaiId,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<SearchBuilder columns={riwayatMutasiTableColumnsDashboard} />
			<div className="min-h-fit overflow-auto">
				<Table>
					<TableHeadBuilder
						columns={riwayatMutasiTableColumnsDashboard}
					/>
					{!isEmptyData ? (
						<KananDataMutasiTableBody data={data} />
					) : (
						<LoadingTable
							columns={riwayatMutasiTableColumnsDashboard}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
		</div>
	)
}

export default KananDataMutasiTable
