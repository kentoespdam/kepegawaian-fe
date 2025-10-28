import type { Pageable } from "@_types/index"
import type { Biodata } from "@_types/profil/biodata"
import type { Keahlian } from "@_types/profil/keahlian"
import TooltipBuilder from "@components/builder/tooltip"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store"
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store"
import { CheckIcon, EllipsisIcon, XIcon } from "lucide-react"
import { memo, useCallback, useEffect, useMemo } from "react"
import KeahlianTableAction from "./button.table.action"
import { Button } from "@components/ui/button"

const IsSertificated = memo(({ isSertifikat }: { isSertifikat: boolean }) => (
	<TableCell className="border-x" align="center">
		<TooltipBuilder
			text={isSertifikat ? "Ada Sertifikat" : "Tidak Ada Sertifikat"}
			className="bg-white text-black"
		>
			{isSertifikat ? (
				<CheckIcon className="h-5 w-5 text-green-500" />
			) : (
				<XIcon className="h-5 w-5 text-red-500" />
			)}
		</TooltipBuilder>
	</TableCell>
))

IsSertificated.displayName = "IsSertificated"

const TableActionButton = memo(
	({
		isKaryawanAktif,
		biodata,
		row,
	}: {
		isKaryawanAktif: boolean
		biodata: Biodata
		row: Keahlian
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<KeahlianTableAction data={row} biodata={biodata} />
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

interface KeahlianTableBodyProps {
	biodata: Biodata
	data: Pageable<Keahlian>
	isKaryawanAktif: boolean
}
const KeahlianTableBody = ({
	biodata,
	data,
	isKaryawanAktif,
}: KeahlianTableBodyProps) => {
	const { nik } = biodata
	const { selectedKeahlianId, setSelectedKeahlianId } = useKeahlianStore(
		(state) => ({
			selectedKeahlianId: state.selectedKeahlianId,
			setSelectedKeahlianId: state.setSelectedKeahlianId,
		})
	)
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}))

	const handleSelect = useCallback(
		(id: number) => {
			setSelectedKeahlianId(selectedKeahlianId === id ? 0 : id)
			setNik(nik)
		},
		[nik, selectedKeahlianId, setSelectedKeahlianId, setNik]
	)

	useEffect(() => {
		if (selectedKeahlianId) setRefId(selectedKeahlianId)
	}, [setRefId, selectedKeahlianId])

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedKeahlianId === row.id,
		}))
	}, [data, selectedKeahlianId])

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					key={row.id}
					className={cn(
						"transition-colors odd:bg-muted/50 hover:bg-green-100",
						{ "bg-green-200 odd:bg-green-300 hover:bg-green-200": row.isSelected }
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
					<TableCell className="text-nowrap border-x">
						{row.jenisKeahlian.nama}
					</TableCell>
					<TableCell className="border-x">
						{row.kualifikasi}
					</TableCell>
					<IsSertificated isSertifikat={row.sertifikasi} />
					<TableCell className="text-nowrap border-x">
						{row.institusi}
					</TableCell>
					<TableCell className="border-x">{row.tahun}</TableCell>
					<TableCell className="border-x">
						{row.masaBerlaku}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default KeahlianTableBody
