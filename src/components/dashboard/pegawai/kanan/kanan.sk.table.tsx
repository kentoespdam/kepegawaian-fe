import {
	type RiwayatSk,
	riwayatSkTableColumnsDashboard,
} from "@_types/kepegawaian/riwayat_sk"
import type { JenisSk } from "@_types/master/jenis_sk"
import type { PegawaiDetail } from "@_types/pegawai"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc, globalGetDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useQueries } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import KananDataRiwayatSkTableBody from "./kanan.sk.table.body"
import { useMemo } from "react"

type KananDataRiwayatSkTableProps = {
	pegawai: PegawaiDetail
}
const KananDataRiwayatSkTable = ({ pegawai }: KananDataRiwayatSkTableProps) => {
	const { id } = pegawai
	const searchParams = useSearchParams()
	const qKeys = useMemo(
		() => [["riwayat-sk", id, searchParams.toString()], ["jenis_sk"]],
		[id, searchParams]
	)

	const queries = useQueries({
		queries: [
			{
				queryKey: qKeys[0],
				queryFn: () =>
					getPageDataEnc<RiwayatSk>({
						path: encodeString(
							`kepegawaian/riwayat/sk/pegawai/${id}`
						),
						isRoot: true,
						searchParams: searchParams.toString(),
					}),
				enabled: !!id,
			},
			{
				queryKey: qKeys[1],
				queryFn: () =>
					globalGetDataEnc<JenisSk[]>({
						path: encodeString("master/jenis-sk"),
						isRoot: true,
					}),
			},
		],
	})

	const {
		data: dataSk,
		isLoading: isLoadingSk,
		isFetching: isFetchingSk,
	} = queries[0]
	const {
		data: dataJenisSk,
		isLoading: isLoadingJenisSk,
		isFetching: isFetchingJenisSk,
	} = queries[1]

	const showLoading =
		isLoadingSk || isFetchingSk || isLoadingJenisSk || isFetchingJenisSk
	const isEmptyData =
		!dataSk || !dataJenisSk || dataSk.empty || dataJenisSk.length === 0

	return (
		<div className="grid gap-0 p-2">
			<SearchBuilder columns={riwayatSkTableColumnsDashboard} />
			<div className="min-h-90 overflow-auto">
				<Table>
					<TableHeadBuilder
						columns={riwayatSkTableColumnsDashboard}
					/>
					{!isEmptyData ? (
						<KananDataRiwayatSkTableBody
							data={dataSk}
							jenisSkList={dataJenisSk}
						/>
					) : (
						<LoadingTable
							columns={riwayatSkTableColumnsDashboard}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={queries[0].data} />
		</div>
	)
}

export default KananDataRiwayatSkTable
