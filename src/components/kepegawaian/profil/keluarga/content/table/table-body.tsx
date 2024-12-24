import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Keluarga } from "@_types/profil/keluarga";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import KeluargaTableAction from "./table-action";

interface KeluargaTableBodyProps {
	biodata: Biodata;
	data: Pageable<Keluarga>;
}
const KeluargaTableBody = (props: KeluargaTableBodyProps) => {
	const { selectedKeluargaId, setSelectedKeluargaId } = useKeluargaStore(
		(state) => ({
			selectedKeluargaId: state.selectedKeluargaId,
			setSelectedKeluargaId: state.setSelectedKeluargaId,
		}),
	);
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = (id: number) => {
		setSelectedKeluargaId(selectedKeluargaId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedKeluargaId);
	}, [setRefId, selectedKeluargaId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": selectedKeluargaId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x">
						<KeluargaTableAction data={row} biodata={props.biodata} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nik}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.jenisKelamin.replace("_", " ")}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.hubunganKeluarga}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.agama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tempatLahir}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tanggalLahir}
					</TableCell>
					<TableCell className="border-x" align="center">
						<TooltipBuilder
							text={row.tanggungan ? "ditanggung" : "Tidak ditanggung"}
							className="bg-white text-black"
						>
							{row.tanggungan ? (
								<CheckIcon className="text-green-500 h-5 w-5" />
							) : (
								<XIcon className="text-red-500 h-5 w-5" />
							)}
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.pendidikan?.nama ?? "-"}
					</TableCell>
					<TableCell className="border-x ">{row.statusKawin}</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KeluargaTableBody;
