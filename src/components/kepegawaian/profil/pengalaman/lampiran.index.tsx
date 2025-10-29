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
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store"
import { useQuery } from "@tanstack/react-query"
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil"
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil"
import LampiranProfilTableBody from "../lampiran/table/body"
import { useMemo } from "react"

type LampiranPengalamanKerjaContent = {
	isKaryawanAktif: boolean
}
const LampiranPengalamanKerjaContent = ({
	isKaryawanAktif,
}: LampiranPengalamanKerjaContent) => {
	const { selectedPengalamanId } = usePengalamanKerjaStore()

	const { rootKey, qKey } = useMemo(
		() => ({
			rootKey: "lampiran-pengalaman",
			qKey: ["lampiran-pengalaman", selectedPengalamanId],
		}),
		[selectedPengalamanId]
	)
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/pengalaman/lampiran/${selectedPengalamanId}`
				),
				isRoot: true,
				searchParams: "",
			}),
		enabled: !!selectedPengalamanId && selectedPengalamanId > 0,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.length === 0

	return (
		<div className="grid min-h-64 gap-0 overflow-auto p-2">
			<div className="min-h-64">
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
							jenis={
								JenisLampiranProfil.Values
									.PROFIL_PENGALAMAN_KERJA
							}
							rootKey="lampiran-pengalaman"
							isKaryawanAktif={isKaryawanAktif}
						/>
					)}
				</Table>
			</div>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/pengalaman"
				jenis={JenisLampiranProfil.Values.PROFIL_PENGALAMAN_KERJA}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	)
}

export default LampiranPengalamanKerjaContent
