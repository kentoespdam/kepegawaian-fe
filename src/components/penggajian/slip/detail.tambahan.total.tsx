import type { GajiBatchMasterProses } from "@_types/gaji_batch_master_process";
import { Table, TableCell, TableHeader, TableRow } from "@components/ui/table";
import { rupiah2 } from "@helpers/number";

const SlipGajiDetailTambhanTotal = ({
	detail,
	jenis,
}: { detail: GajiBatchMasterProses[]; jenis: "PEMASUKAN" | "POTONGAN" }) => {
	const filtered = detail.filter(
		(item) => item.kode.startsWith("ADD_") && item.jenisGaji === jenis,
	);
	const total = filtered.reduce((acc, item) => acc + item.nilai, 0);
	return (
		<Table className="text-xs bg-secondary">
			<TableHeader>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" align="right">
						{jenis === "PEMASUKAN" ? "Total Penerimaan Tambahan" : "Total Potongan Tambahan"}
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						:
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						Rp.
					</TableCell>
					<TableCell className="px-2 py-1" align="right" width={100}>
						{rupiah2(total)}
					</TableCell>
				</TableRow>
			</TableHeader>
		</Table>
	);
};

export default SlipGajiDetailTambhanTotal;
