import type { Pageable } from "@_types/index"
import type { Biodata } from "@_types/profil/biodata"
import type { Pendidikan } from "@_types/profil/pendidikan"
import TooltipBuilder from "@components/builder/tooltip"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store"
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store"
import {
	CheckCircleIcon,
	CircleDashedIcon,
	CircleDotIcon,
	EllipsisIcon,
} from "lucide-react"
import { memo, useCallback, useEffect, useMemo } from "react"
import ProfilPendidikanAction from "./button.table.action"
import type { QueryKey } from "@tanstack/react-query"
import { Button } from "@components/ui/button"

interface ProfilPendidikanTableBodyProps {
	biodata: Biodata
	data: Pageable<Pendidikan>
	qKey: QueryKey
	isKaryawanAktif: boolean
}

const ApprovalStatusIcon = memo(({ disetujui }: { disetujui: boolean }) => (
	<TooltipBuilder
		text={disetujui ? "Disetujui" : "Belum Disetujui"}
		className="bg-white text-black shadow-md"
	>
		{disetujui ? (
			<CircleDotIcon className="size-5 text-green-500" />
		) : (
			<CircleDashedIcon className="size-5 text-red-500" />
		)}
	</TooltipBuilder>
))

ApprovalStatusIcon.displayName = "ApprovalStatusIcon"

const LatestEducationIcon = memo(({ isLatest }: { isLatest: boolean }) =>
	isLatest ? <CheckCircleIcon className="size-4 text-primary" /> : null
)

LatestEducationIcon.displayName = "LatestEducationIcon"

const TableActionButton = memo(
	({
		isKaryawanAktif,
		biodata,
		row,
		qKey,
	}: {
		isKaryawanAktif: boolean
		biodata: Biodata
		row: Pendidikan
		qKey: QueryKey
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<ProfilPendidikanAction
					biodata={biodata}
					data={row}
					qKey={qKey}
				/>
			) : (
				<Button
					variant="secondary"
					size="icon"
					className="size-5"
					aria-label="Menu aksi"
				>
					<EllipsisIcon className="size-4" />
				</Button>
			)}
		</TableCell>
	)
)

TableActionButton.displayName = "TableActionButton"

const ProfilPendidikanTableBody = ({
	biodata,
	isKaryawanAktif,
	data,
	qKey,
}: ProfilPendidikanTableBodyProps) => {
	const { nik } = biodata
	const { selectedPendidikanId, setSelectedPendidikanId } =
		usePendidikanStore((state) => ({
			selectedPendidikanId: state.selectedPendidikanId,
			setSelectedPendidikanId: state.setSelectedPendidikanId,
		}))

	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}))

	const handleSelect = useCallback(
		(id: number) => {
			setSelectedPendidikanId(selectedPendidikanId === id ? 0 : id)
			setNik(nik)
		},
		[selectedPendidikanId, setSelectedPendidikanId, setNik, nik]
	)

	useEffect(() => {
		if (selectedPendidikanId) {
			setRefId(selectedPendidikanId)
		}
	}, [setRefId, selectedPendidikanId])

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedPendidikanId === row.id,
		}))
	}, [data, selectedPendidikanId])

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					key={row.id}
					className={cn(
						"transition-colors odd:bg-muted/50 hover:bg-green-100",
						{
							"bg-green-200 odd:bg-green-300 hover:bg-green-200":
								row.isSelected,
						}
					)}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{row.urut}
					</TableCell>
					<TableActionButton
						isKaryawanAktif={isKaryawanAktif}
						biodata={biodata}
						row={row}
						qKey={qKey}
					/>
					<TableCell className="border-x">
						{row.jenjangPendidikan.nama}
					</TableCell>
					<TableCell className="border-x">{row.institusi}</TableCell>
					<TableCell className="border-x">{row.jurusan}</TableCell>
					<TableCell className="border-x">{row.kota}</TableCell>
					<TableCell className="border-x">{row.tahunMasuk}</TableCell>
					<TableCell className="border-x">{row.tahunLulus}</TableCell>
					<TableCell className="border-x">{row.gpa}</TableCell>
					<TableCell className="border-x">{row.gelarDepan}</TableCell>
					<TableCell className="border-x">
						{row.gelarBelakang}
					</TableCell>
					<TableCell className="border-x" align="center">
						<ApprovalStatusIcon disetujui={row.disetujui} />
					</TableCell>

					<TableCell className="border-x" align="center">
						<LatestEducationIcon isLatest={row.isLatest} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default ProfilPendidikanTableBody
