"use client"
import type { Biodata } from "@_types/profil/biodata"
import { type Keluarga, keluargaTableColumns } from "@_types/profil/keluarga"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import FormKeluargaDialog from "./dialog.form"
import KeluargaTableBody from "./table.body"
import { useMemo } from "react"

interface ProfilKeluargaContentComponentProps {
	biodata: Biodata
	isKaryawanAktif: boolean
}
const ProfilKeluargaContentComponent = ({
	biodata,
	isKaryawanAktif,
}: ProfilKeluargaContentComponentProps) => {
	const searchParams = useSearchParams()
	const { keluargaId, openDelete, setOpenDelete } = useKeluargaStore(
		(state) => ({
			keluargaId: state.keluargaId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)
	const { nik } = biodata
	const qKey = useMemo(
		() => [
			["profil-keluarga", nik, searchParams.toString()],
			["lampiran-keluarga", keluargaId],
		],
		[searchParams, nik, keluargaId]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey[0],
		queryFn: () =>
			getPageDataEnc<Keluarga>({
				path: encodeString(`profil/keluarga/${nik}/biodata`),
				searchParams: searchParams.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<div className="min-h-80">
				<Table>
					<TableHeadBuilder columns={keluargaTableColumns} />
					{!isEmptyData ? (
						<KeluargaTableBody
							biodata={biodata}
							data={data}
							isKaryawanAktif={isKaryawanAktif}
						/>
					) : (
						<LoadingTable
							columns={keluargaTableColumns}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<FormKeluargaDialog />
			<DeleteZodDialogBuilder
				id={keluargaId}
				deletePath={"profil/keluarga"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKey}
			/>
		</div>
	)
}

export default ProfilKeluargaContentComponent
