"use client"

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import {
	type LampiranProfil,
	lampiranProfilTableColumns,
} from "@_types/profil/lampiran"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import { Table } from "@components/ui/table"
import { getListDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store"
import { useQuery } from "@tanstack/react-query"
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "../lampiran/table/body"
import { useMemo } from "react"

type LampiranKeahlianContentProps = {
	isKaryawanAktif: boolean
}
const LampiranKeahlianContent = ({
	isKaryawanAktif,
}: LampiranKeahlianContentProps) => {
	const { selectedKeahlianId } = useKeahlianStore((state) => ({
		selectedKeahlianId: state.selectedKeahlianId,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-keahlian",
			qKey: ["lampiran-keahlian", selectedKeahlianId],
		}),
		[selectedKeahlianId]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/keahlian/lampiran/${selectedKeahlianId}`
				),
				isRoot: true,
			}),
		enabled: !!selectedKeahlianId && selectedKeahlianId > 0,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.length === 0

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<Table>
				<TableHeadBuilder columns={lampiranProfilTableColumns} />
				{isEmptyData ? (
					<LoadingTable
						columns={lampiranProfilTableColumns}
						isLoading={showLoading}
					/>
				) : (
					<LampiranProfilTableBody
						data={data}
						jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
						rootKey={rootKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				)}
			</Table>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/keahlian"
				jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranKeahlianContent
