"use client"

import {
	type LampiranSk,
	lampiranSkTableColumns,
} from "@_types/kepegawaian/lampiran_sk"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import { Table } from "@components/ui/table"
import { globalGetDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import LampiranSkForm from "./form.index"
import LampiranSkTableBody from "./table.body"
import { useMemo } from "react"

type LampiranSkContentProps = {
	isKaryawanAktif: boolean
}
const LampiranSkContent = ({ isKaryawanAktif }: LampiranSkContentProps) => {
	const searchParams = useSearchParams()
	const {
		lampiranId,
		jenisSk,
		refId,
		openDeleteLampiranForm,
		setOpenDeleteLampiranForm,
	} = useLampiranSkStore((state) => ({
		lampiranId: state.lampiranId,
		jenisSk: state.ref,
		refId: state.refId,
		openDeleteLampiranForm: state.openDeleteLampiranForm,
		setOpenDeleteLampiranForm: state.setOpenDeleteLampiranForm,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-sk",
			qKey: ["lampiran-sk", jenisSk, refId],
		}),
		[jenisSk, refId]
	)

	const { data, isLoading, isFetching } = useQuery<LampiranSk[]>({
		queryKey: qKey,
		queryFn: async () =>
			await globalGetDataEnc<LampiranSk[]>({
				path: encodeString(
					`kepegawaian/lampiran/list/${jenisSk}/${refId}`
				),
				isRoot: true,
				searchParams: searchParams.toString(),
			}),
		enabled: !!jenisSk && !!refId,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.length === 0

	return (
		<div className="mb-4 grid gap-0 overflow-auto p-2">
			<div className="min-h-fit">
				<Table>
					<TableHeadBuilder columns={lampiranSkTableColumns} />
					{isEmptyData ? (
						<LoadingTable
							columns={lampiranSkTableColumns}
							isLoading={showLoading}
						/>
					) : (
						<LampiranSkTableBody
							data={data}
							rootKey={rootKey}
							isKaryawanAktif={isKaryawanAktif}
						/>
					)}
				</Table>
			</div>

			<LampiranSkForm rootKey={rootKey} savePath="kepegawaian/lampiran" />
			<DeleteZodDialogBuilder
				id={lampiranId}
				queryKeys={[[rootKey]]}
				deletePath={`kepegawaian/lampiran/${jenisSk}/${refId}`}
				openDelete={openDeleteLampiranForm}
				setOpenDelete={setOpenDeleteLampiranForm}
			/>
		</div>
	)
}

export default LampiranSkContent
