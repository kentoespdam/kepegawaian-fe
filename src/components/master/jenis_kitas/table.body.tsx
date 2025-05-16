import type { Pageable } from "@_types/index";
import type { JenisKitas } from "@_types/master/jenis_kitas";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import JenisKitasTableAction from "./button.table.action";

type JenisKitasTableBodyProps = {
	data: Pageable<JenisKitas>;
};

const JenisKitasTableBody = ({ data }: JenisKitasTableBodyProps) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell align="center" className="border-x">
						<JenisKitasTableAction jenisKitasId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default JenisKitasTableBody;
