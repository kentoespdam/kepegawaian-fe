"use client"

import {
	type RiwayatSk,
	riwayatSkTableColumns,
} from "@_types/kepegawaian/riwayat_sk"
import type { JenisSk } from "@_types/master/jenis_sk"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc, globalGetDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk"
import { useQueries } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import RiwayatSkFormComponent from "./form.index"
import RiwayatSkTableBody from "./table.body"
import { useMemo } from "react"

type RiwayatSkContentComponentProps = {
	pegawaiId: number
	isKaryawanAktif: boolean
}
const RiwayatSkContentComponent = ({
	pegawaiId,
	isKaryawanAktif,
}: RiwayatSkContentComponentProps) => {
	const searchParams = useSearchParams()
	const { riwayatSkId, openDelete, setOpenDelete } = useRiwayatSkStore(
		(state) => ({
			riwayatSkId: state.riwayatSkId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)
	const qKeys = useMemo(
		() => [
			["riwayat-sk", pegawaiId, searchParams.toString()],
			["jenis_sk"],
		],
		[pegawaiId, searchParams]
	)

	const queries = useQueries({
		queries: [
			{
				queryKey: qKeys[0],
				queryFn: () =>
					getPageDataEnc<RiwayatSk>({
						path: encodeString(
							`kepegawaian/riwayat/sk/pegawai/${pegawaiId}`
						),
						isRoot: true,
						searchParams: searchParams.toString(),
					}),
				enabled: !!pegawaiId,
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
		data: dataRiwayatSk,
		isLoading: isLoadingRiwayatSk,
		isFetching: isFetchingRiwayatSk,
	} = queries[0]
	const {
		data: dataJenisSk,
		isLoading: isLoadingJenisSk,
		isFetching: isFetchingJenisSk,
	} = queries[1]

	const showLoading =
		isLoadingRiwayatSk ||
		isLoadingJenisSk ||
		isFetchingRiwayatSk ||
		isFetchingJenisSk
	const isEmptyData =
		!dataRiwayatSk ||
		!dataJenisSk ||
		dataRiwayatSk.empty ||
		dataJenisSk.length === 0

	return (
		<div className="grid gap-0 p-2">
			<SearchBuilder columns={riwayatSkTableColumns} />
			<div className="min-h-90 overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatSkTableColumns} />
					{!isEmptyData ? (
						<RiwayatSkTableBody
							pegawaiId={pegawaiId}
							data={dataRiwayatSk}
							jenisSkList={dataJenisSk}
							isKaryawanAktif={isKaryawanAktif}
						/>
					) : (
						<LoadingTable
							columns={riwayatSkTableColumns}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={dataRiwayatSk} />
			<RiwayatSkFormComponent />
			<DeleteZodDialogBuilder
				id={riwayatSkId}
				queryKeys={[qKeys[0]]}
				deletePath={"kepegawaian/riwayat/sk"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
			/>
		</div>
	)
}

export default RiwayatSkContentComponent
