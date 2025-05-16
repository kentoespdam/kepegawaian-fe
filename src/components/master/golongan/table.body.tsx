import type { Pageable } from "@_types/index";
import type { Golongan } from "@_types/master/golongan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import GolonganTableAction from "./button.table.action";

const GolonganTableBody = ({ data }: { data: Pageable<Golongan> }) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.golongan}</TableCell>
					<TableCell className="border-x">{row.pangkat}</TableCell>
					<TableCell align="center" className="border-x" width={60}>
						<GolonganTableAction golonganId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default GolonganTableBody;
