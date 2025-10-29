import type { Pageable } from "@_types/index"
import type { Biodata } from "@_types/profil/biodata"
import type { KartuIdentitas } from "@_types/profil/kartu_identitas"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store"
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store"
import { memo, useCallback, useEffect } from "react"
import KartuIdentitasTableAction from "./button.table.action"
import { Button } from "@components/ui/button"
import { EllipsisIcon } from "lucide-react"

interface KartuIdentitasTableBodyProps {
	biodata: Biodata
	data: Pageable<KartuIdentitas>
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
		row: KartuIdentitas
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<KartuIdentitasTableAction data={row} biodata={biodata} />
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

const KartuIdentitasTableBody = ({
	biodata,
	data,
	isKaryawanAktif,
}: KartuIdentitasTableBodyProps) => {
	const { nik } = biodata
	const { selectedKartuIdentitasId, setSelectedKartuIdentitasId } =
		useKartuIdentitasStore((state) => ({
			selectedKartuIdentitasId: state.selectedKartuIdentitasId,
			setSelectedKartuIdentitasId: state.setSelectedKartuIdentitasId,
		}))
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}))

	const handleSelect = useCallback(
		(id: number) => {
			setSelectedKartuIdentitasId(
				selectedKartuIdentitasId === id ? 0 : id
			)
			setNik(nik)
		},
		[nik, selectedKartuIdentitasId, setSelectedKartuIdentitasId, setNik]
	)

	useEffect(() => {
		if (selectedKartuIdentitasId) setRefId(selectedKartuIdentitasId)
	}, [setRefId, selectedKartuIdentitasId])

	let urut = getUrut(data)

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300":
							selectedKartuIdentitasId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableActionButton
						isKaryawanAktif={isKaryawanAktif}
						biodata={biodata}
						row={row}
					/>
					<TableCell className="border-x">
						{row.jenisKartu.nama}
					</TableCell>
					<TableCell className="border-x">{row.nomorKartu}</TableCell>
					<TableCell className="border-x">
						{row.tanggalExpired}
					</TableCell>
					<TableCell className="border-x">
						{row.tanggalTerima}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default KartuIdentitasTableBody
