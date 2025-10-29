import type { Pageable } from "@_types/index"
import type { Biodata } from "@_types/profil/biodata"
import type { PengalamanKerja } from "@_types/profil/pengalaman_kerja"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store"
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store"
import { EllipsisIcon } from "lucide-react"
import { memo, useCallback, useEffect, useMemo } from "react"
import ProfilPengalamanAction from "./button.table.action"
import { Button } from "@components/ui/button"

const TableActionButton = memo(
	({
		isKaryawanAktif,
		biodata,
		row,
	}: {
		isKaryawanAktif: boolean
		biodata: Biodata
		row: PengalamanKerja
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<ProfilPengalamanAction biodata={biodata} data={row} />
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

interface ProfilPengalamanKerjaTableBodyProps {
	data: Pageable<PengalamanKerja>
	biodata: Biodata
	isKaryawanAktif: boolean
}
const ProfilPengalamanKerjaTableBody = ({
	data,
	biodata,
	isKaryawanAktif,
}: ProfilPengalamanKerjaTableBodyProps) => {
	const { nik } = biodata
	const { selectedPengalamanId, setSelectedPengalamanId } =
		usePengalamanKerjaStore((state) => ({
			selectedPengalamanId: state.selectedPengalamanId,
			setSelectedPengalamanId: state.setSelectedPengalamanId,
		}))

	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}))

	const handleSelect = useCallback(
		(id: number) => {
			setSelectedPengalamanId(selectedPengalamanId === id ? 0 : id)
			setNik(nik)
		},
		[nik, selectedPengalamanId, setSelectedPengalamanId, setNik]
	)

	useEffect(() => {
		if (selectedPengalamanId) setRefId(selectedPengalamanId)
	}, [setRefId, selectedPengalamanId])

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedPengalamanId === row.id,
		}))
	}, [data, selectedPengalamanId])

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300":
							selectedPengalamanId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{row.urut}
					</TableCell>
					<TableActionButton
						biodata={biodata}
						row={row}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<TableCell className="border-x">
						{row.namaPerusahaan}
					</TableCell>
					<TableCell className="border-x">
						{row.typePerusahaan}
					</TableCell>
					<TableCell className="border-x">{row.jabatan}</TableCell>
					<TableCell className="border-x">{row.lokasi}</TableCell>
					<TableCell className="border-x" align="right">
						{row.tahunMasuk}
					</TableCell>
					<TableCell className="border-x" align="right">
						{row.tahunKeluar}
					</TableCell>
					<TableCell className="border-x">{row.notes}</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default ProfilPengalamanKerjaTableBody
