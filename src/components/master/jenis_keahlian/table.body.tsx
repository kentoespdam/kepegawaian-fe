import type { Pageable } from "@_types/index";
import type { JenisKeahlian } from "@_types/master/jenis_keahlian";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableRow, TableCell } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type JenisKeahlianTableBodyProps = {
	data: Pageable<JenisKeahlian>;
};

const JenisKeahlianTableBody = ({ data }: JenisKeahlianTableBodyProps) => {
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
							msg="Delete JenisKeahlian"
							action={hapus}
							tag="jenis_keahlian"
						/>
						<ButtonEditBuilder
							href={`/master/jenis_keahlian/edit/${row.id}`}
							msg="Edit JenisKeahlian"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default JenisKeahlianTableBody;