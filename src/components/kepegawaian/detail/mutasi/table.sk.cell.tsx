import { TableCell } from "@components/ui/table";
import { rupiah } from "@helpers/number";
import { dateToIndonesian } from "@helpers/string";
import type { MutasiRowProps } from "./table.body";

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
					<span>: {dateToIndonesian(row.tmtBerlaku)}</span>
					<span>: {row.skMutasi?.nomorSk}</span>
					<span>: {rupiah(row.skMutasi?.gajiPokok)}</span>
				</div>
			</div>
		</TableCell>
	);
};

export default RiwayatMutasiSKCell;
