import { TableCell } from "@components/ui/table"
import type { MutasiRowProps } from "./table.body"
import { memo } from "react"

const MutasiJabatanCell = memo(({ row }: MutasiRowProps) => {
	return (
		<TableCell className="whitespace-nowrap border-x">
			<div className="flex gap-2">
				<div className="grid">
					<span>Lama</span>
					<span>Baru</span>
				</div>
				<div className="grid">
					<span>: {row.namaJabatanLama}</span>
					<span>: {row.jabatan?.nama}</span>
				</div>
			</div>
		</TableCell>
	)
})
MutasiJabatanCell.displayName = "MutasiJabatanCell"

export default MutasiJabatanCell
