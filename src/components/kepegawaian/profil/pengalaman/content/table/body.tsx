import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { PengalamanKerja } from "@_types/profil/pengalaman_kerja";
import TooltipBuilder from "@components/builder/tooltip";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";
import { usePengalamanKerjaStore } from "@store/kepegawaian/biodata/pengalaman-store";
import { CircleDashedIcon, CircleDotIcon } from "lucide-react";
import { useEffect } from "react";
import ProfilPengalamanAction from "../../button/table-action";

interface ProfilPengalamanKerjaTableBodyProps {
	data: Pageable<PengalamanKerja>;
	biodata: Biodata;
}
const ProfilPengalamanKerjaTableBody = (
	props: ProfilPengalamanKerjaTableBodyProps,
) => {
	const { selectedPengalamanId, setSelectedPengalamanId } =
		usePengalamanKerjaStore((state) => ({
			selectedPengalamanId: state.selectedPengalamanId,
			setSelectedPengalamanId: state.setSelectedPengalamanId,
		}));

	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = (id: number) => {
		setSelectedPengalamanId(selectedPengalamanId === id ? 0 : id);
		setNik(props.biodata.nik);
	};

	useEffect(() => {
		setRefId(selectedPengalamanId);
	}, [setRefId, selectedPengalamanId]);

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": selectedPengalamanId === row.id,
					})}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border-x p-0" align="center">
						<ProfilPengalamanAction biodata={props.biodata} data={row} />
					</TableCell>
					<TableCell className="border-x">{row.namaPerusahaan}</TableCell>
					<TableCell className="border-x">{row.typePerusahaan}</TableCell>
					<TableCell className="border-x">{row.jabatan}</TableCell>
					<TableCell className="border-x">{row.lokasi}</TableCell>
					<TableCell className="border-x">{row.tanggalMasuk}</TableCell>
					<TableCell className="border-x">{row.tanggalKeluar}</TableCell>
					<TableCell className="border-x">{row.notes}</TableCell>
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
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfilPengalamanKerjaTableBody;
