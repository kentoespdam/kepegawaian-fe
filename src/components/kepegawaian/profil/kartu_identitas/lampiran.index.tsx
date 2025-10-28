"use client"

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import {
	type LampiranProfil,
	lampiranProfilTableColumns,
} from "@_types/profil/lampiran"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import LampiranFormDialog from "@components/kepegawaian/profil/lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "@components/kepegawaian/profil/lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "@components/kepegawaian/profil/lampiran/table/body"
import { Table } from "@components/ui/table"
import { getListDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

type LampiranKartuIdentitasContentProps = {
	isKaryawanAktif: boolean
}

const LampiranKartuIdentitasContent = ({
	isKaryawanAktif,
}: LampiranKartuIdentitasContentProps) => {
	const { selectedKartuIdentitasId } = useKartuIdentitasStore((state) => ({
		selectedKartuIdentitasId: state.selectedKartuIdentitasId,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-kartu-identitas",
			qKey: ["lampiran-kartu-identitas", selectedKartuIdentitasId],
		}),
		[selectedKartuIdentitasId]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/kartu-identitas/lampiran/${selectedKartuIdentitasId}`
				),
				isRoot: true,
			}),
		enabled: !!selectedKartuIdentitasId && selectedKartuIdentitasId > 0,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.length === 0

	return (
		<div className="grid min-h-96 gap-0 overflow-auto p-2">
			<div className="min-h-96">
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
							jenis={JenisLampiranProfil.Values.KARTU_IDENTITAS}
							rootKey={rootKey}
							isKaryawanAktif={isKaryawanAktif}
						/>
					)}
				</Table>
			</div>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/kartu-identitas"
				jenis={JenisLampiranProfil.Values.KARTU_IDENTITAS}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranKartuIdentitasContent
