import type { Kontrak } from "@_types/laporan/kepegawaian/kontrak";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

type LapKontrakTableBodyProps = {
	data: Kontrak[];
};
const LapKontrakTableBody = ({ data }: LapKontrakTableBodyProps) => {
	let urut = 1;
	return (
		<TableBody>
			{data.map((row) => (
				<TableRow key={row.nipam}>
					<TableCell className="border" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border text-nowrap">{row.nama}</TableCell>
					<TableCell className="border text-nowrap">
						{row.nomor_kontrak}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.nama_organisasi}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.nama_jabatan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tanggal_mulai}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tanggal_selesai}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.sisa_tahun} Th {row.sisa_bulan} Bln
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LapKontrakTableBody;
