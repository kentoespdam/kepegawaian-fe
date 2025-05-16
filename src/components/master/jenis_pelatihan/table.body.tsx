import type { Pageable } from "@_types/index";
import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import JenisPelatihanTableAction from "./button.table.action";

type JenisPelatihanTableBodyProps = {
	data: Pageable<JenisPelatihan>;
};

const JenisPelatihanTableBody = ({ data }: JenisPelatihanTableBodyProps) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" className="border-x" width={60}>
						{urut++}
					</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell align="center" className="border-x" width={60}>
						<JenisPelatihanTableAction jenisPelatihanId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default JenisPelatihanTableBody;
