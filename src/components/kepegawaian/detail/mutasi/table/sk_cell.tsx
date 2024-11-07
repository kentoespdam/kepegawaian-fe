import { TableCell } from "@components/ui/table";
import { rupiah } from "@helpers/number";
import type { MutasiRowProps } from "./body";
import { dateToIndonesian } from "@helpers/string";

const RiwayatMutasiSKCell = ({ row }: MutasiRowProps) => {
	console.log(row);
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
					{/* <span>: {rupiah(row.skMutasi.gajiPokok)}</span> */}
				</div>
			</div>
		</TableCell>
	);
};

export default RiwayatMutasiSKCell;
