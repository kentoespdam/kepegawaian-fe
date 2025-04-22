import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { KartuIdentitas } from "@_types/profil/kartu_identitas";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { useEffect } from "react";
import KartuIdentitasTableAction from "./button.table.action";

interface KartuIdentitasTableBodyProps {
	biodata: Biodata;
	data: Pageable<KartuIdentitas>;
}
const KartuIdentitasTableBody = (props: KartuIdentitasTableBodyProps) => {
	const { selectedKartuIdentitasId, setSelectedKartuIdentitasId } =
		useKartuIdentitasStore((state) => ({
			selectedKartuIdentitasId: state.selectedKartuIdentitasId,
			setSelectedKartuIdentitasId: state.setSelectedKartuIdentitasId,
		}));
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = (id: number) => {
		setSelectedKartuIdentitasId(selectedKartuIdentitasId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedKartuIdentitasId);
	}, [setRefId, selectedKartuIdentitasId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300":
							selectedKartuIdentitasId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x">
						<KartuIdentitasTableAction data={row} biodata={props.biodata} />
					</TableCell>
					<TableCell className="border-x">{row.jenisKartu.nama}</TableCell>
					<TableCell className="border-x">{row.nomorKartu}</TableCell>
					<TableCell className="border-x">{row.tanggalExpired}</TableCell>
					<TableCell className="border-x">{row.tanggalTerima}</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KartuIdentitasTableBody;
