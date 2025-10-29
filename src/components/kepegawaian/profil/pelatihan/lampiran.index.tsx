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
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store"
import { useQuery } from "@tanstack/react-query"
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "../lampiran/table/body"
import { useMemo } from "react"

type LampiranPelatihanContentProps = {
	isKaryawanAktif: boolean
}
const LampiranPelatihanContent = ({
	isKaryawanAktif,
}: LampiranPelatihanContentProps) => {
	const { selectedPelatihanId } = usePelatihanStore((state) => ({
		selectedPelatihanId: state.selectedPelatihanId,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-pelatihan",
			qKey: ["lampiran-pelatihan", selectedPelatihanId],
		}),
		[selectedPelatihanId]
	)
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/pelatihan/lampiran/${selectedPelatihanId}`
				),
				isRoot: true,
			}),
		enabled: !!selectedPelatihanId && selectedPelatihanId > 0,
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
						jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
						rootKey={rootKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				)}
			</Table>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/pelatihan"
				jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranPelatihanContent
