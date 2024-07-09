import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { CheckCircleIcon } from "lucide-react";
import ProfilPendidikanAction from "./table-action";

interface ProfilPendidikanTableBodyProps {
	biodata: Biodata;
	data: Pageable<Pendidikan>;
}
const ProfilPendidikanTableBody = (props: ProfilPendidikanTableBodyProps) => {
	let urut = getUrut(props.data);
	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x p-0" align="center">
						<ProfilPendidikanAction biodata={props.biodata} data={row} />
					</TableCell>
					<TableCell className="border-x">
						{row.jenjangPendidikan.nama}
					</TableCell>
					<TableCell className="border-x">{row.institusi}</TableCell>
					<TableCell className="border-x">{row.jurusan}</TableCell>
					<TableCell className="border-x">{row.kota}</TableCell>
					<TableCell className="border-x">{row.tahunMasuk}</TableCell>
					<TableCell className="border-x">{row.tahunLulus}</TableCell>
					<TableCell className="border-x">{row.gpa}</TableCell>
					<TableCell className="border-x">{row.gelarDepan}</TableCell>
					<TableCell className="border-x">{row.gelarBelakang}</TableCell>
					<TableCell className="border-x" align="center">
						{row.isLatest ? (
							<CheckCircleIcon className="h-4 w-4 text-primary" />
						) : null}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfilPendidikanTableBody;
