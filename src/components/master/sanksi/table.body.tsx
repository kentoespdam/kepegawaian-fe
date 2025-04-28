import type { Pageable } from "@_types/index";
import type { Sanksi } from "@_types/master/sanksi";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { PinIcon, PinOffIcon } from "lucide-react";
import SanksiTableAction from "./button.table.action";

interface YesNoCellProps {
	value: boolean;
}
const YesNoCell = ({ value }: YesNoCellProps) => {
	return value ? (
		<TooltipBuilder text="Ya" className="bg-primary" delayDuration={100}>
			<PinIcon className="w-4 h-4 text-primary cursor-pointer" />
		</TooltipBuilder>
	) : (
		<TooltipBuilder text="Tidak" className="bg-destructive" delayDuration={100}>
			<PinOffIcon className="w-4 h-4 text-destructive" />
		</TooltipBuilder>
	);
};

interface SanksiTableBodyProps {
	data: Pageable<Sanksi>;
}
const SanksiTableBody = ({ data }: SanksiTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x" align="center" width={60}>
						<SanksiTableAction row={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.kode}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.keterangan}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.potTkk} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="right">
						{row.jmlPotTkk}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isPendingPangkat} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isPendingGaji} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isTurunPangkat} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isTurunJabatan} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isSuspension} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isTerminateDh} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						<YesNoCell value={row.isTerminateTh} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default SanksiTableBody;
