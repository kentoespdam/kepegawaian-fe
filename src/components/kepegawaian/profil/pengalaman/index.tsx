"use client"
import type { Biodata } from "@_types/profil/biodata"
import {
	type PengalamanKerja,
	pengalamanKerjaTableColumns,
} from "@_types/profil/pengalaman_kerja"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import FormProfilPengalamanKerjaDialog from "./dialog.form"
import ProfilPengalamanKerjaTableBody from "./table.body"
import { useMemo } from "react"

type ProfilPengalamanKerjaContentProps = {
	biodata: Biodata
	isKaryawanAktif: boolean
}
const ProfilPengalamanKerjaContentComponent = ({
	biodata,
	isKaryawanAktif,
}: ProfilPengalamanKerjaContentProps) => {
	const searchParams = useSearchParams()
	const { nik } = biodata

	const { pengalamanId, openDelete, setOpenDelete } = usePengalamanKerjaStore(
		(state) => ({
			pengalamanId: state.pengalamanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)

	const qKey = useMemo(
		() => ["pengalaman-kerja", nik, searchParams.toString()],
		[nik, searchParams]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<PengalamanKerja>({
				path: encodeString(`profil/pengalaman/${nik}/biodata`),
				searchParams: searchParams.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<div className="grid min-h-64 gap-0 overflow-auto p-2">
			<SearchBuilder columns={pengalamanKerjaTableColumns} />
			<div className="min-h-64">
				<Table>
					<TableHeadBuilder columns={pengalamanKerjaTableColumns} />
					{!isEmptyData ? (
						<ProfilPengalamanKerjaTableBody
							data={data}
							biodata={biodata}
							isKaryawanAktif={isKaryawanAktif}
						/>
					) : (
						<LoadingTable
							columns={pengalamanKerjaTableColumns}
							isLoading={showLoading}
						/>
					)}
				</Table>
			</div>
			<PaginationBuilder data={data} />
			<FormProfilPengalamanKerjaDialog />
			<DeleteZodDialogBuilder
				id={pengalamanId}
				deletePath={"profil/pengalaman"}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	)
}

export default ProfilPengalamanKerjaContentComponent
