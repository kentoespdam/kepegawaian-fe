import type { PegawaiDetail } from "@_types/pegawai"
import {
	type GajiBatchMaster,
	gajiBatchMasterColumnsDashboard,
} from "@_types/penggajian/gaji_batch_master"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import KananDataGajiTableBody from "./kanan.gaji.table.body"
import { useSlipGajiStore } from "@store/penggajian/slip"
import SlipGajiComponent from "@components/penggajian/slip"
import { useMemo } from "react"

type KananDataGajiTableProps = {
	pegawai: PegawaiDetail
}
const KananDataGajiTable = ({ pegawai }: KananDataGajiTableProps) => {
	const { id } = pegawai
	const { gajiId, open, setOpen } = useSlipGajiStore((state) => ({
		gajiId: state.gajiId,
		open: state.open,
		setOpen: state.setOpen,
	}))

	const searchParams = useSearchParams()
	const qKey = useMemo(
		() => ["riwayat-gaji", id, searchParams.toString()],
		[id, searchParams]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<GajiBatchMaster>({
				path: encodeString(`penggajian/batch/master/pegawai/${id}`),
				isRoot: true,
				searchParams: searchParams.toString(),
			}),
		enabled: !!id,
	})
	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty
	return (
		<div className="grid gap-0 overflow-auto p-2">
			<Table>
				<TableHeadBuilder columns={gajiBatchMasterColumnsDashboard} />
				{!isEmptyData ? (
					<KananDataGajiTableBody data={data} />
				) : (
					<LoadingTable
						columns={gajiBatchMasterColumnsDashboard}
						isLoading={showLoading}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<SlipGajiComponent gajiId={gajiId} open={open} setOpen={setOpen} />
		</div>
	)
}

export default KananDataGajiTable
