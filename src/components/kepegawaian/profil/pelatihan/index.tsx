"use client"
import type { Biodata } from "@_types/profil/biodata"
import { type Pelatihan, pelatihanTableColumns } from "@_types/profil/pelatihan"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import FormPelatihanDialog from "./dialog.form"
import PelatihanTableBody from "./table.body"
import { useMemo } from "react"

interface ProfilPelatihanContentProps {
	biodata: Biodata
	isKaryawanAktif: boolean
}
const ProfilPelatihanContentComponent = ({
	biodata,
	isKaryawanAktif,
}: ProfilPelatihanContentProps) => {
	const { nik } = biodata
	const searchParams = useSearchParams()

	const { pelatihanId, openDelete, setOpenDelete } = usePelatihanStore(
		(state) => ({
			pelatihanId: state.pelatihanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)

	const qKeys = useMemo(
		() => [
			["profil-pelatihan", nik, searchParams.toString()],
			["lampiran-pelatihan", pelatihanId],
		],
		[nik, pelatihanId, searchParams]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKeys[0],
		queryFn: () =>
			getPageDataEnc<Pelatihan>({
				path: encodeString(`profil/pelatihan/${nik}/biodata`),
				searchParams: searchParams.toString(),
				isRoot: true,
			}),
		enabled: !!nik,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<Table>
				<TableHeadBuilder columns={pelatihanTableColumns} />
				{!isEmptyData ? (
					<PelatihanTableBody
						biodata={biodata}
						data={data}
						isKaryawanAktif={isKaryawanAktif}
					/>
				) : (
					<LoadingTable
						columns={pelatihanTableColumns}
						isLoading={showLoading}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<FormPelatihanDialog />
			<DeleteZodDialogBuilder
				id={pelatihanId}
				deletePath="profil/pelatihan"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKeys}
			/>
		</div>
	)
}

export default ProfilPelatihanContentComponent
