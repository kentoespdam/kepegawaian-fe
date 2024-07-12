import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { CheckCircleIcon } from "lucide-react";
import ProfilPendidikanAction from "./table-action";
import { usePendidikanStore } from "@store/kepegawaian/biodata/pendidikan-store";
import { cn } from "@lib/utils";
import React from "react";
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";

interface ProfilPendidikanTableBodyProps {
	biodata: Biodata;
	data: Pageable<Pendidikan>;
}
const ProfilPendidikanTableBody = (props: ProfilPendidikanTableBodyProps) => {
	const { setSelectedPendidikanId } = usePendidikanStore((state) => ({
		setSelectedPendidikanId: state.setSelectedPendidikanId,
	}));

	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const [rowSelected, setRowSelected] = React.useState(0);
	const handleSelect = (id: number) => {
		setRowSelected((prev) => (prev === id ? 0 : id));
		setSelectedPendidikanId(id);
		setRefId(id);
		setNik(props.biodata.nik);
	};

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": rowSelected === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
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
