import type { Pageable } from "@_types/index"
import type { Biodata } from "@_types/profil/biodata"
import type { Pelatihan } from "@_types/profil/pelatihan"
import TooltipBuilder from "@components/builder/tooltip"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { dateToIndonesian } from "@helpers/string"
import { cn } from "@lib/utils"
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store"
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store"
import { CheckIcon, EllipsisIcon, XIcon } from "lucide-react"
import { memo, useEffect, useMemo } from "react"
import PelatihanTableAction from "./button.table.action"
import { Button } from "@components/ui/button"

interface PelatihanTableBodyProps {
	biodata: Biodata
	data: Pageable<Pelatihan>
	isKaryawanAktif: boolean
}

const TableActionButton = memo(
	({
		isKaryawanAktif,
		biodata,
		row,
	}: {
		isKaryawanAktif: boolean
		biodata: Biodata
		row: Pelatihan
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<PelatihanTableAction biodata={biodata} data={row} />
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

const LulusIcon = memo(({ isLulus }: { isLulus: boolean }) => {
	const tooltipText = isLulus ? "Lulus" : "Tidak Lulus"
	const IconComponent = isLulus ? CheckIcon : XIcon
	const iconColor = isLulus ? "text-green-500" : "text-red-500"

	return (
		<TableCell className="border-x" align="center">
			<TooltipBuilder
				text={tooltipText}
				className="bg-white text-black shadow-sm"
			>
				<IconComponent
					className={`size-5 ${iconColor}`}
					aria-label={tooltipText}
				/>
			</TooltipBuilder>
		</TableCell>
	)
})

LulusIcon.displayName = "LulusIcon"

const IkatanDinasIcon = memo(
	({ isIkatanDinas }: { isIkatanDinas: boolean }) => {
		const IconComponent = isIkatanDinas ? CheckIcon : XIcon
		const iconColor = isIkatanDinas ? "text-green-500" : "text-red-500"

		return (
			<TableCell className="border-x" align="center">
				<IconComponent className={`size-5 ${iconColor}`} />
			</TableCell>
		)
	}
)

IkatanDinasIcon.displayName = "IkatanDinasIcon"

const PelatihanTableBody = ({
	biodata,
	data,
	isKaryawanAktif,
}: PelatihanTableBodyProps) => {
	const { nik } = biodata
	const { selectedPelatihanId, setSelectedPelatihanId } = usePelatihanStore(
		(state) => ({
			selectedPelatihanId: state.selectedPelatihanId,
			setSelectedPelatihanId: state.setSelectedPelatihanId,
		})
	)
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}))

	const handleSelect = (id: number) => {
		setSelectedPelatihanId(selectedPelatihanId === id ? 0 : id)
		setNik(nik)
	}

	useEffect(() => {
		if (selectedPelatihanId) setRefId(selectedPelatihanId)
	}, [setRefId, selectedPelatihanId])

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedPelatihanId === row.id,
		}))
	}, [data, selectedPelatihanId])

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
						row={row}
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<TableCell className="border-x">
						{row.jenisPelatihan.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.lembaga}
					</TableCell>
					<TableCell className="border-x" align="right">
						{row.nilai}
					</TableCell>
					<LulusIcon isLulus={row.lulus} />
					<TableCell
						className="whitespace-nowrap border-x"
						align="center"
					>
						{dateToIndonesian(row.tanggalMulai)}
					</TableCell>
					<TableCell
						className="whitespace-nowrap border-x"
						align="center"
					>
						{dateToIndonesian(row.tanggalSelesai)}
					</TableCell>
					<IkatanDinasIcon isIkatanDinas={row.ikatanDinas} />
					<TableCell className="whitespace-nowrap border-x">
						{row.tanggalAkhirIkatan}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default PelatihanTableBody
