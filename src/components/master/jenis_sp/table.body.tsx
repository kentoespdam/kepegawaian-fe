import type { Pageable } from "@_types/index";
import type { JenisSp } from "@_types/master/jenis_sp";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import JenisSpTableAction from "./button.table.action";
import JenisSpSanksiCell from "./table.sanksi";

interface JenisSpTableBodyProps {
	data: Pageable<JenisSp>;
}
const JenisSpTableBody = ({ data }: JenisSpTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x" align="center" width={60}>
						<JenisSpTableAction row={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.kode}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nama}
					</TableCell>
					<TableCell className="border-x">
						<JenisSpSanksiCell row={row} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default JenisSpTableBody;
