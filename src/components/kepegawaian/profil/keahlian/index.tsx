"use client"
import type { Biodata } from "@_types/profil/biodata"
import { type Keahlian, keahlianTableColumns } from "@_types/profil/keahlian"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import FormKeahlianDialog from "./dialog.form"
import KeahlianTableBody from "./table.body"
import { useMemo } from "react"

interface ProfilKeahlianContentComponentProps {
	biodata: Biodata
	isKaryawanAktif: boolean
}
const ProfilKeahlianContentComponent = ({
	biodata,
	isKaryawanAktif,
}: ProfilKeahlianContentComponentProps) => {
	const searchParams = useSearchParams()
	const { nik } = biodata

	const { keahlianId, openDelete, setOpenDelete } = useKeahlianStore(
		(state) => ({
			keahlianId: state.keahlianId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)

	const qKeys = useMemo(
		() => [
			["profil-keahlian", nik, searchParams.toString()],
			["lampiran-keahlian", keahlianId],
		],
		[nik, keahlianId, searchParams]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKeys[0],
		queryFn: () =>
			getPageDataEnc<Keahlian>({
				path: encodeString(`profil/keahlian/${nik}/biodata`),
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
				<TableHeadBuilder columns={keahlianTableColumns} />
				{!isEmptyData ? (
					<KeahlianTableBody
						biodata={biodata}
						data={data}
						isKaryawanAktif={isKaryawanAktif}
					/>
				) : (
					<LoadingTable
						columns={keahlianTableColumns}
						isLoading={showLoading}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<FormKeahlianDialog />
			<DeleteZodDialogBuilder
				id={keahlianId}
				deletePath="profil/keahlian"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={qKeys}
			/>
		</div>
	)
}

export default ProfilKeahlianContentComponent
