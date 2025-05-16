import type { Pageable } from "@_types/index";
import type { Level } from "@_types/master/level";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import LevelTableAction from "./button.table.action";

type LevelTableBodyProps = {
	data: Pageable<Level>;
};

const LevelTableBody = ({ data }: LevelTableBodyProps) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell align="center" className="border-x" width={60}>
						<LevelTableAction levelId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LevelTableBody;
