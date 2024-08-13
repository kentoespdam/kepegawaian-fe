import type { Pageable } from "@_types/index";
import type { Level } from "@_types/master/level";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableRow, TableCell } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type LevelTableBodyProps = {
	data: Pageable<Level>;
};

const LevelTableBody = ({ data }: LevelTableBodyProps) => {
	let urut = getUrut(data)

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell align="center" className="border-x">
						<ButtonDeleteBuilder
							id={row.id}
							msg="Delete Level"
							action={hapus}
							tag="level"
						/>
						<ButtonEditBuilder
							href={`/master/level/edit/${row.id}`}
							msg="Edit Level"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default LevelTableBody;