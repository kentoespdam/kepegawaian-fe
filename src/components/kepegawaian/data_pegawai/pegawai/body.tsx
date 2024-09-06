import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import KepegawaianTableAction from "./table-action";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";
import { cn } from "@lib/utils";

type PegawaiTableBodyProps = {
	data: Pageable<Pegawai>;
};
const PegawaiTableBody = ({ data }: PegawaiTableBodyProps) => {
	const { pegawaiId, setPegawaiId, setPegawaiNik } = useRingkasanPegawaiStore();
	let urut = getUrut(data);

	const onSelectRow = (row: Pegawai) => {
        console.log("clicked")
		if (pegawaiId === row.id) {
			setPegawaiId(0);
			setPegawaiNik("");
			return;
		}
		setPegawaiId(row.id);
		setPegawaiNik(row.biodata.nik);
	};
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": pegawaiId === row.id,
					})}
					key={row.id}
					onClick={() => onSelectRow(row)}
				>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						<KepegawaianTableAction data={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.nama}
					</TableCell>
					<TableCell className="border-x">{row.nipam}</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.biodata.jenisKelamin.replace("_", " ")}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.golongan.golongan} - {row.golongan.pangkat}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.jabatan.nama}
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
