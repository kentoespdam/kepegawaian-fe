import { TableCell } from "@components/ui/table";
import type { MutasiRowProps } from "./body";

const MutasiJabatanCell = ({ row }: MutasiRowProps) => {
	return (
		<TableCell className="border-x whitespace-nowrap">
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
	);
};

export default MutasiJabatanCell;
