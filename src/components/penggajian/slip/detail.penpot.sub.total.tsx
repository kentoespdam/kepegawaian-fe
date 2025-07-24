import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { Table, TableCell, TableHeader, TableRow } from "@components/ui/table";
import { rupiah2 } from "@helpers/number";

const SlipGajiDetailPenPotSubTotal = ({
	detail,
}: { detail: GajiBatchMaster }) => {
	return (
		<Table className="text-xs">
			<TableHeader>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" align="right">
						Penerimaan - Potongan
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						:
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						Rp.
					</TableCell>
					<TableCell className="px-2 py-1" align="right" width={100}>
						{rupiah2(detail.penghasilanBersih)}
					</TableCell>
				</TableRow>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" align="right">
						Pembulatan
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						:
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						Rp.
					</TableCell>
					<TableCell className="px-2 py-1" align="right" width={100}>
						{rupiah2(detail.pembulatan)}
					</TableCell>
				</TableRow>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" align="right">
						Sub Total
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						:
					</TableCell>
					<TableCell className="px-2 py-1" width={10}>
						Rp.
					</TableCell>
					<TableCell className="px-2 py-1" align="right" width={100}>
						{rupiah2(detail.penghasilanBersih + detail.pembulatan)}
					</TableCell>
				</TableRow>
			</TableHeader>
		</Table>
	);
};

export default SlipGajiDetailPenPotSubTotal;
