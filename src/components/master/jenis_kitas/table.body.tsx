import type { Pageable } from "@_types/index";
import type { JenisKitas } from "@_types/master/jenis_kitas";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type JenisKitasTableBodyProps = {
	data: Pageable<JenisKitas>;
};

const JenisKitasTableBody = ({ data }: JenisKitasTableBodyProps) => {
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
							msg="Delete JenisKitas"
							action={hapus}
							tag="jenis_kitas"
						/>
						<ButtonEditBuilder
							href={`/master/jenis_kitas/edit/${row.id}`}
							msg="Edit JenisKitas"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default JenisKitasTableBody;