import type { Pageable } from "@_types/index";
import type { RiwayatTerminasi } from "@_types/kepegawaian/terminasi";
import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { PenIcon, PlusIcon } from "lucide-react";
import LampiranTerminasiColumn from "./lampiran-terminasi";

const MasaKerjaTableCell = ({
	tanggalTerminasi,
	tmtKerja,
}: { tanggalTerminasi: string; tmtKerja: string | null }) => {
	const now = new Date(tanggalTerminasi);
	const tmt = new Date(tmtKerja ?? 0);
	const masaKerjaTahun = now.getFullYear() - tmt.getFullYear();
	const masaKerjaBulan = now.getMonth() - tmt.getMonth();
	return (
		<TableCell align="center" className="border-x text-nowrap">
			{masaKerjaTahun} thn {masaKerjaBulan} bln
		</TableCell>
	);
};

interface TerminatedTableBodyProps {
	data: Pageable<RiwayatTerminasi>;
}
const TerminatedTableBody = ({ data }: TerminatedTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x" align="center">
						<TooltipBuilder text="Edit Terminasi">
							<ButtonLink
								href={`/kepegawaian/terminasi/edit?id=${row.id}`}
								size="icon"
								icon={<PenIcon className="h-4 w-4" />}
								className="ml-auto h-6 w-6 bg-orange-500 text-white"
							/>
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.tanggalTerminasi}
					</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.alasanTerminasi.nama}
					</TableCell>
					<TableCell className="border-x text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border-x text-nowrap">{row.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.nomorSk}</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.skTerminasi.tanggalSk}
					</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.namaOrganisasi}
					</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.namaJabatan}
					</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.namaGolongan}
					</TableCell>
					<MasaKerjaTableCell
						tanggalTerminasi={row.tanggalTerminasi}
						tmtKerja={row.pegawai.tmtPegawai ?? row.pegawai.tmtKerja}
					/>
					<LampiranTerminasiColumn row={row.lampiranSkTerminasi} />
					<TableCell className="border-x text-nowrap">{row.notes}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default TerminatedTableBody;
