import type { LepasTanggunganAnak } from "@_types/laporan/kepegawaian/lta";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

const LapLtaTableBody = ({ data }: { data: LepasTanggunganAnak[] }) => {
	let urut = 1;
	return (
		<TableBody>
			{data.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nama_anak}</TableCell>
					<TableCell className="border text-nowrap">
						{row.jenis_kelamin}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tanggal_lahir}
					</TableCell>
					<TableCell className="border text-nowrap">{row.umur} Th</TableCell>
					<TableCell className="border text-nowrap">
						{row.status_pendidikan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.nama_karyawan}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border text-nowrap">
						{row.nama_jabatan}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LapLtaTableBody;
