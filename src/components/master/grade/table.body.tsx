import type { Pageable } from "@_types/index";
import type { Grade } from "@_types/master/grade";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import GradeTableAction from "./button.table.action";

const GradeTableBody = ({ data }: { data: Pageable<Grade> }) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.level.nama}</TableCell>
					<TableCell align="center" className="border-x">
						Grade {row.grade}
					</TableCell>
					<TableCell align="right" className="border-x">
						{rupiah(row.tukin)}
					</TableCell>
					<TableCell align="center" className="border-x" width={60}>
						<GradeTableAction gradeId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default GradeTableBody;
