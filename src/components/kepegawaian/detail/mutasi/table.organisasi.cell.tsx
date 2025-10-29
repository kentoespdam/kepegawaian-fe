import { TableCell } from "@components/ui/table"
import type { MutasiRowProps } from "./table.body"
import { memo } from "react"

const MutasiOrganisasiCell = memo(({ row }: MutasiRowProps) => {
	return (
		<TableCell className="whitespace-nowrap border-x">
			<div className="flex gap-2">
				<div className="grid">
					<span>Lama</span>
					<span>Baru</span>
				</div>
				<div className="grid">
					<span>: {row.namaOrganisasiLama}</span>
					<span>: {row.organisasi?.nama}</span>
				</div>
			</div>
		</TableCell>
	)
})
MutasiOrganisasiCell.displayName = "MutasiOrganisasiCell"

export default MutasiOrganisasiCell
