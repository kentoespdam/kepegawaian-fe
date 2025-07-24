import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { Table, TableCell, TableHeader, TableRow } from "@components/ui/table";
import { rupiah2 } from "@helpers/number";

const SlipGajiDetailTambahanSubTotal = ({
	detail,
}: { detail: GajiBatchMaster }) => {
	return (
		<Table className="text-xs">
			<TableHeader>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" align="right">
						Total Dibayarkan
					</TableCell>
					<TableCell className="px-2 py-1 font-bold" width={10}>
						:
					</TableCell>
					<TableCell className="px-2 py-1 font-bold" width={10}>
						Rp.
					</TableCell>
					<TableCell className="px-2 py-1 font-bold" align="right" width={100}>
						{rupiah2(detail.penghasilanBersihFinal2)}
					</TableCell>
				</TableRow>
			</TableHeader>
		</Table>
	);
};

export default SlipGajiDetailTambahanSubTotal;
