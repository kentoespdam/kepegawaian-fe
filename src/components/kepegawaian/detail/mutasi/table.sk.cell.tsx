import { TableCell } from "@components/ui/table"
import { rupiah } from "@helpers/number"
import { dateToIndonesian } from "@helpers/string"
import type { MutasiRowProps } from "./table.body"
import { memo } from "react"

const RiwayatMutasiSKCell = memo(({ row }: MutasiRowProps) => {
	return (
		<TableCell className="whitespace-nowrap border-x">
			<div className="flex gap-2">
				<div className="grid">
					<span>Efektif</span>
					<span>Nomor</span>
					<span>Gaji Pokok</span>
				</div>
				<div className="grid">
					<span>: {dateToIndonesian(row.tmtBerlaku)}</span>
					<span>: {row.skMutasi?.nomorSk}</span>
					<span>: {rupiah(row.skMutasi?.gajiPokok)}</span>
				</div>
			</div>
		</TableCell>
	)
})
RiwayatMutasiSKCell.displayName = "RiwayatMutasiSKCell"

export default RiwayatMutasiSKCell
