"use client"

import {
	type RiwayatMutasi,
	riwayatMutasiTableColumns,
} from "@_types/kepegawaian/riwayat-mutasi"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import RiwayatMutasiTableBody from "./table.body"
import { useMemo } from "react"

type MutasiContentProps = {
	pegawaiId: number
	isKaryawanAktif: boolean
}
const MutasiContentComponent = ({
	pegawaiId,
	isKaryawanAktif,
}: MutasiContentProps) => {
	const searchParams = useSearchParams()
	const { riwayatMutasiId, openDelete, setOpenDelete } =
		useRiwayatMutasiStore((state) => ({
			riwayatMutasiId: state.riwayatMutasiId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}))

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
		<div className="grid gap-0 p-2">
			<SearchBuilder columns={riwayatMutasiTableColumns} />
			<div className="min-h-fit overflow-auto">
				<Table>
					<TableHeadBuilder columns={riwayatMutasiTableColumns} />
					{!isEmptyData ? (
						<RiwayatMutasiTableBody
							pegawaiId={pegawaiId}
							data={data}
							isKaryawanAktif={isKaryawanAktif}
						/>
					) : (
						<LoadingTable
							columns={riwayatMutasiTableColumns}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={riwayatMutasiId}
				deletePath="kepegawaian/riwayat/mutasi"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	)
}

export default MutasiContentComponent
