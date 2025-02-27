import type { Pageable } from "@_types/index";
import type { JenjangPendidikan } from "@_types/master/jenjang_pendidikan";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type JenjangPendidikanTableBodyProps = {
	data: Pageable<JenjangPendidikan>;
};

const JenjangPendidikanTableBody = ({ data }: JenjangPendidikanTableBodyProps) => {
	let urut = getUrut(data)

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" className="border-x w-[60px]">{urut++}</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableCell className="border-x">{row.seq}</TableCell>
					<TableCell align="center" className="border-x w-[100px]">
						<ButtonDeleteBuilder
							id={row.id}
							msg="Delete JenjangPendidikan"
							action={hapus}
							tag="jenjang_pendidikan"
						/>
						<ButtonEditBuilder
							href={`/master/jenjang_pendidikan/edit/${row.id}`}
							msg="Edit JenjangPendidikan"
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default JenjangPendidikanTableBody;