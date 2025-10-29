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
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store"
import { useQuery } from "@tanstack/react-query"
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "../lampiran/table/body"
import { useMemo } from "react"

type LampiranKeluargaContentProps = {
	isKaryawanAktif: boolean
}
const LampiranKeluargaContent = ({
	isKaryawanAktif,
}: LampiranKeluargaContentProps) => {
	const { selectedKeluargaId } = useKeluargaStore((state) => ({
		selectedKeluargaId: state.selectedKeluargaId,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-keluarga",
			qKey: ["lampiran-keluarga", selectedKeluargaId],
		}),
		[selectedKeluargaId]
	)
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/keluarga/lampiran/${selectedKeluargaId}`
				),
				isRoot: true,
			}),
		enabled: !!selectedKeluargaId && selectedKeluargaId > 0,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.length === 0

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<div className="min-h-80">
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
							jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
							rootKey={rootKey}
							isKaryawanAktif={isKaryawanAktif}
						/>
					)}
				</Table>
			</div>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/keluarga"
				jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranKeluargaContent
