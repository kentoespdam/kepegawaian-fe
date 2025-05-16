import type { Pageable } from "@_types/index";
import type { JenisKeahlian } from "@_types/master/jenis_keahlian";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import JenisKeahlianTableAction from "./button.table.action";

type JenisKeahlianTableBodyProps = {
	data: Pageable<JenisKeahlian>;
};

const JenisKeahlianTableBody = ({ data }: JenisKeahlianTableBodyProps) => {
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
						<JenisKeahlianTableAction jenisKeahlianId={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default JenisKeahlianTableBody;
