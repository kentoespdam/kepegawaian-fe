import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Pelatihan } from "@_types/profil/pelatihan";
import DisetujuiIconBuilder from "@components/builder/disetujui-icon";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useEffect } from "react";
import PelatihanTableAction from "./action-button";
import TooltipBuilder from "@components/builder/tooltip";
import { CheckIcon, XIcon } from "lucide-react";

interface PelatihanTableBodyProps {
	biodata: Biodata;
	data: Pageable<Pelatihan>;
}
const PelatihanTableBody = (props: PelatihanTableBodyProps) => {
	const { selectedPelatihanId, setSelectedPelatihanId } = usePelatihanStore(
		(state) => ({
			selectedPelatihanId: state.selectedPelatihanId,
			setSelectedPelatihanId: state.setSelectedPelatihanId,
		}),
	);
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = (id: number) => {
		setSelectedPelatihanId(selectedPelatihanId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedPelatihanId);
	}, [setRefId, selectedPelatihanId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": selectedPelatihanId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x">
						<PelatihanTableAction data={row} biodata={props.biodata} />
					</TableCell>
					<TableCell className="border-x">{row.jenisPelatihan.nama}</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.nama}</TableCell>
					<TableCell className="border-x" align="right">{row.nilai}</TableCell>
					<TableCell className="border-x" align="center">
						<TooltipBuilder
							text={row.lulus ? "Lulus" : "Tidak Lulus"}
							className="bg-white text-black"
						>
							{row.lulus ? (
								<CheckIcon className="text-green-500 h-5 w-5" />
							) : (
								<XIcon className="text-red-500 h-5 w-5" />
							)}
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.tanggalMulai}</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.tanggalSelesai}</TableCell>
					<TableCell className="border-x" align="center">
						<DisetujuiIconBuilder disetujui={row.disetujui} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.notes}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default PelatihanTableBody;
