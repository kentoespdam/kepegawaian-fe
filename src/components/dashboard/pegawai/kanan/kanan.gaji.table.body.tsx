import type { Pageable } from "@_types/index";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import { useSlipGajiStore } from "@store/penggajian/slip";
import { PrinterIcon } from "lucide-react";

type KananDataGajiTableBodyProps = {
	data: Pageable<GajiBatchMaster>;
};
const KananDataGajiTableBody = ({ data }: KananDataGajiTableBodyProps) => {
	const { setGajiId, setOpen } = useSlipGajiStore((state) => ({
		setGajiId: state.setGajiId,
		setOpen: state.setOpen,
	}));

	const handleOpenSlip = (gajiId: number) => {
		setGajiId(gajiId);
		setOpen(true);
	};

	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x text-nowrap">{row.periode}</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.namaJabatan}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.penghasilanKotor)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.totalPotongan)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.pembulatan)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.penghasilanBersih)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.totalAddTambahan)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.totalAddPotongan)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="right">
						{rupiah(row.penghasilanBersihFinal2)}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="center">
						<TooltipBuilder
							text="Cetak Slip Gaji"
							delayDuration={100}
							className="bg-warning text-warning-foreground"
						>
							<Button
								size="icon"
								className="size-6 bg-warning text-warning-foreground"
								onClick={() => handleOpenSlip(row.id)}
							>
								<PrinterIcon className="size-4" />
							</Button>
						</TooltipBuilder>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KananDataGajiTableBody;
