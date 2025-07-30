import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { CheckCircleIcon, CircleDashedIcon, CircleDotIcon } from "lucide-react";
import { useEffect } from "react";
import ProfilPendidikanAction from "./button.table.action";
import type { QueryKey } from "@tanstack/react-query";

interface ProfilPendidikanTableBodyProps {
	biodata: Biodata;
	data: Pageable<Pendidikan>;
	qKey:QueryKey
}
const ProfilPendidikanTableBody = (props: ProfilPendidikanTableBodyProps) => {
	const { selectedPendidikanId, setSelectedPendidikanId } = usePendidikanStore(
		(state) => ({
			selectedPendidikanId: state.selectedPendidikanId,
			setSelectedPendidikanId: state.setSelectedPendidikanId,
		}),
	);

	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = (id: number) => {
		setSelectedPendidikanId(selectedPendidikanId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedPendidikanId);
	}, [setRefId, selectedPendidikanId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": selectedPendidikanId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x p-0" align="center">
						<ProfilPendidikanAction biodata={props.biodata} data={row} qKey={props.qKey} />
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
						<TooltipBuilder
							text={row.disetujui ? "Disetujui" : "Belum Disetujui"}
							className="bg-white text-black shadow-md"
						>
							{row.disetujui ? (
								<CircleDotIcon className="text-green-500 h-5 w-5" />
							) : (
								<CircleDashedIcon className="text-red-500 h-5 w-5" />
							)}
						</TooltipBuilder>
					</TableCell>
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
