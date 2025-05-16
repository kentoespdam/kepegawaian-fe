import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Keahlian } from "@_types/profil/keahlian";
import DisetujuiIconBuilder from "@components/builder/disetujui-icon";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import KeahlianTableAction from "./button.table.action";

interface KeahlianTableBodyProps {
	biodata: Biodata;
	data: Pageable<Keahlian>;
}
const KeahlianTableBody = (props: KeahlianTableBodyProps) => {
	const { selectedKeahlianId, setSelectedKeahlianId } = useKeahlianStore(
		useShallow((state) => ({
			selectedKeahlianId: state.selectedKeahlianId,
			setSelectedKeahlianId: state.setSelectedKeahlianId,
		})),
	);
	const { setRefId, setNik } = useLampiranProfilStore(
		useShallow((state) => ({
			setRefId: state.setRefId,
			setNik: state.setNik,
		})),
	);

	const handleSelect = (id: number) => {
		setSelectedKeahlianId(selectedKeahlianId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedKeahlianId);
	}, [setRefId, selectedKeahlianId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": selectedKeahlianId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x">
						<KeahlianTableAction data={row} biodata={props.biodata} />
					</TableCell>
					<TableCell className="border-x">{row.jenisKeahlian.nama}</TableCell>
					<TableCell className="border-x">{row.kualifikasi}</TableCell>
					<TableCell className="border-x" align="center">
						<TooltipBuilder
							text={row.sertifikasi ? "Ada Sertifikat" : "Tidak Ada Sertifikat"}
							className="bg-white text-black"
						>
							{row.sertifikasi ? (
								<CheckIcon className="text-green-500 h-5 w-5" />
							) : (
								<XIcon className="text-red-500 h-5 w-5" />
							)}
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x">{row.institusi}</TableCell>
					<TableCell className="border-x">{row.tahun}</TableCell>
					<TableCell className="border-x">{row.masaBerlaku}</TableCell>
					<TableCell className="border-x" align="center">
						<DisetujuiIconBuilder disetujui={row.disetujui} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KeahlianTableBody;
