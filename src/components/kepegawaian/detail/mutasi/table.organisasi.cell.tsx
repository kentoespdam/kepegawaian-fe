import { TableCell } from "@components/ui/table";
import type { MutasiRowProps } from "./table.body";

const MutasiOrganisasiCell = ({ row }: MutasiRowProps) => {
	return (
		<TableCell className="border-x whitespace-nowrap">
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
	);
};

export default MutasiOrganisasiCell;
