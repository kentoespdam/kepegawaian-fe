import type { Pageable } from "@_types/index";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

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
					<TableCell align="center" className="border-x">
						<ButtonDeleteBuilder
							id={row.id}
							msg="Delete Alasan Berhenti"
							action={hapus}
							tag="alasan_berhenti"
						/>
						<ButtonEditBuilder
							href={`/master/alasan_berhenti/edit/${row.id}`}
							msg="Edit Alasan Berhenti"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default AlasanBerhentiTableBody;
