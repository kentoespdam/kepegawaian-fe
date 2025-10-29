import { TableCell } from "@components/ui/table"
import type { MutasiRowProps } from "./table.body"
import { memo } from "react"

const MutasiGolonganCell = memo(({ row }: MutasiRowProps) => {
	return (
		<TableCell className="whitespace-nowrap border-x">
			<div className="flex gap-2">
				<div className="grid">
					<span>Lama</span>
					<span>Baru</span>
				</div>
				<div className="grid">
					<span>
						: {row.golonganLama?.golongan} -{" "}
						{row.golonganLama?.pangkat}
					</span>
					<span>
						: {row.golongan?.golongan} - {row.golongan?.pangkat}
					</span>
				</div>
			</div>
		</TableCell>
	)
})
MutasiGolonganCell.displayName = "MutasiGolonganCell"

export default MutasiGolonganCell
