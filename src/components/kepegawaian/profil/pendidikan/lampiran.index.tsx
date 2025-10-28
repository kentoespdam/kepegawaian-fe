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
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store"
import { useQuery } from "@tanstack/react-query"
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "../lampiran/table/body"
import { useMemo } from "react"

type LampiranPendidikanContentProps = {
	isKaryawanAktif: boolean
}
const LampiranPendidikanContent = ({
	isKaryawanAktif,
}: LampiranPendidikanContentProps) => {
	const { selectedPendidikanId } = usePendidikanStore((state) => ({
		selectedPendidikanId: state.selectedPendidikanId,
	}))

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiranPendidikan",
			qKey: ["lampiranPendidikan", selectedPendidikanId],
		}),
		[selectedPendidikanId]
	)
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/pendidikan/lampiran/${selectedPendidikanId}`
				),
				isRoot: true,
			}),
		enabled: !!selectedPendidikanId && selectedPendidikanId > 0,
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
						jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
						rootKey={rootKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				)}
			</Table>
			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/pendidikan"
				jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranPendidikanContent
