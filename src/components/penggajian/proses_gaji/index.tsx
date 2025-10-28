"use client"

import type { PegawaiDetail } from "@_types/pegawai"
import {
	type GajiBatchRoot,
	gajiBatchRootColumns,
} from "@_types/penggajian/gaji_batch_root"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import DeleteBatchRootDialog from "./dialog.delete"
import GajiBatchRootTableBody from "./table.body"

interface ProsesGajiComponentProps {
	pegawai: PegawaiDetail
}
const ProsesGajiComponent = ({ pegawai }: ProsesGajiComponentProps) => {
	const { batchId, openDelete, setOpenDelete } = useGajiBatchRootStore(
		(state) => ({
			batchId: state.batchId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)
	const params = useSearchParams()

	const qKey = useMemo(() => {
		const search = new URLSearchParams(params)
		return ["gaji_batch_root", search.toString()]
	}, [params])

	const { isLoading, isFetching, data } = useQuery({
		queryKey: qKey,

		queryFn: async () => {
			const search = new URLSearchParams(params)
			return await getPageDataEnc<GajiBatchRoot>({
				path: encodeString("penggajian/batch"),
				searchParams: search.toString(),
				isRoot: true,
			})
		},
		staleTime: 1000 * 60,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<>
			<SearchBuilder columns={gajiBatchRootColumns} qKey={qKey} />
			<div className="min-h-90 w-full overflow-auto">
				<Table>
					<TableHeadBuilder columns={gajiBatchRootColumns} />
					{showLoading || isEmptyData ? (
						<LoadingTable
							columns={gajiBatchRootColumns}
							isLoading={showLoading}
						/>
					) : (
						<GajiBatchRootTableBody
							data={data}
							pegawai={pegawai}
							qKey={qKey}
						/>
					)}
				</Table>
				<PaginationBuilder data={data} />
			</div>
			<DeleteBatchRootDialog
				id={batchId}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</>
	)
}

export default ProsesGajiComponent
