import type { Pageable } from "@_types/index";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import AlasanBerhentiTableAction from "./button.table.action";

interface AlasanBerhentiTableBodyProps {
	data: Pageable<AlasanBerhenti>;
}
const AlasanBerhentiTableBody = ({ data }: AlasanBerhentiTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x text-nowrap">{row.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.notes}</TableCell>
					<TableCell align="center" width={60} className="border-x">
						<AlasanBerhentiTableAction id={row.id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default AlasanBerhentiTableBody;
