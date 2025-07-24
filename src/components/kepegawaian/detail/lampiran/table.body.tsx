import type { LampiranSk } from "@_types/kepegawaian/lampiran_sk";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { CircleDashedIcon, CircleDotIcon } from "lucide-react";
import LampiranSkTableAction from "./button.table.action";

type LampiranSkTableBodyProps = {
	data: LampiranSk[];
	rootKey: string;
};
const LampiranSkTableBody = ({
	data,
	rootKey,
}: LampiranSkTableBodyProps) => {
	let urut = 1;
	return (
		<TableBody>
			{data.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.fileName}</TableCell>
					<TableCell className="border-x">{row.notes}</TableCell>
					<TableCell className="border-x" align="center">
						<TooltipBuilder
							text={row.disetujui ? "Disetujui" : "Belum Disetujui"}
							className="bg-white text-black shadow-md"
						>
							{row.disetujui ? (
								<CircleDotIcon className="text-green-500 h-5 w-5" />
							) : (
								<CircleDashedIcon className="text-red-500 h-5 w-5" />
							)}
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x w-20" align="center">
						<LampiranSkTableAction
							data={row}
							rootKey={rootKey}
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LampiranSkTableBody;
