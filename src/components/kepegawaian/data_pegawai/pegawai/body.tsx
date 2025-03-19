import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";
import { EyeIcon } from "lucide-react";
import KepegawaianTableAction from "./table-action";

type PegawaiTableBodyProps = {
	data: Pageable<Pegawai>;
};
const PegawaiTableBody = ({ data }: PegawaiTableBodyProps) => {

	const { pegawaiId, setPegawaiId } = useRingkasanPegawaiStore();
	let urut = getUrut(data);

	const onSelectRow = (row: Pegawai) => {
		if (pegawaiId === row.id)
			setPegawaiId(0);
		else
			setPegawaiId(row.id);

	};
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": pegawaiId === row.id,
					})}
					key={row.id}
				>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						<div className="flex gap-2 items-center">
							<Button
								size="icon"
								variant="ghost"
								className="h-6 w-6 text-cyan-400 hover:bg-transparent hover:text-cyan-700"
								onClick={() => onSelectRow(row)}
							>
								<EyeIcon />
							</Button>
							<KepegawaianTableAction data={row} />
						</div>
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.nipam}</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.jenisKelamin.replace("_", " ")}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.golongan?.golongan}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.organisasi?.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.jabatan.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.profesi?.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.tanggalLahir}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.statusKawin.replace("_", " ")}
					</TableCell>
					<TableCell className="border-x"> </TableCell>
					<TableCell className="border-x"> </TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.statusPegawai}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default PegawaiTableBody;
