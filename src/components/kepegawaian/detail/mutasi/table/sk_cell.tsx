import { TableCell } from "@components/ui/table";
import { dateToIndonesian } from "@helpers/string";
import type { MutasiRowProps } from "./body";

const RiwayatMutasiSKCell = ({ row }: MutasiRowProps) => {
	return (
		<TableCell className="border-x whitespace-nowrap">
			<div className="flex gap-2">
				<div className="grid">
					<span>Efektif</span>
					<span>Nomor</span>
					<span>Gaji Pokok</span>
				</div>
				<div className="grid">
					<span>: {dateToIndonesian(row.skMutasi.tmtBerlaku)}</span>
					<span>: {row.skMutasi.nomorSk}</span>
				</div>
			</div>
		</TableCell>
	);
};

export default RiwayatMutasiSKCell;
