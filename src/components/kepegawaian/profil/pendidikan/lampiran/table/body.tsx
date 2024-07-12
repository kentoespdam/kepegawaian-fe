import type { LampiranProfil } from "@_types/profil/lampiran";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import LampiranPendidikanAction from "./table-action";
import { CircleDashedIcon, CircleDotIcon } from "lucide-react";
import TooltipBuilder from "@components/builder/tooltip";
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";

interface LampiranPendidikanTableBodyProps {
	data: LampiranProfil[];
}
const LampiranPendidikanTableBody = ({
	data,
}: LampiranPendidikanTableBodyProps) => {
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
					<TableCell className="border-x" align="center">
						<LampiranPendidikanAction id={row.id} refId={row.refId} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LampiranPendidikanTableBody;
