import type { Pageable } from "@_types/index";
import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type JenisPelatihanTableBodyProps = {
	data: Pageable<JenisPelatihan>;
};

const JenisPelatihanTableBody = ({ data }: JenisPelatihanTableBodyProps) => {
	let urut = getUrut(data)

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" className="border-x w-[60px]">{urut++}</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell align="center" className="border-x w-[100px]">
						<ButtonDeleteBuilder
							id={row.id}
							msg="Delete JenisPelatihan"
							action={hapus}
							tag="jenis_pelatihan"
						/>
						<ButtonEditBuilder
							href={`/master/jenis_pelatihan/edit/${row.id}`}
							msg="Edit JenisPelatihan"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default JenisPelatihanTableBody;