import { TableCell } from "@components/ui/table";
import type { MutasiRowProps } from "./table.body";

const MutasiGolonganCell = ({ row }: MutasiRowProps) => {
	return (
		<TableCell className="border-x whitespace-nowrap">
			<div className="flex gap-2">
				<div className="grid">
					<span>Lama</span>
					<span>Baru</span>
				</div>
				<div className="grid">
					<span>
						: {row.golonganLama?.golongan} - {row.golonganLama?.pangkat}
					</span>
					<span>
						: {row.golongan?.golongan} - {row.golongan?.pangkat}
					</span>
				</div>
			</div>
		</TableCell>
	);
};

export default MutasiGolonganCell;
