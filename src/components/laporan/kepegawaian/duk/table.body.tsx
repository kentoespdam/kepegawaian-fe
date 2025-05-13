import type { DUK } from "@_types/laporan/kepegawaian/duk";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

interface DukTableBodyProps {
	duk: DUK[];
}
const DukTableBody = ({ duk }: DukTableBodyProps) => {
	let urut = 0;
	return (
		<TableBody>
			{duk.map((row) => (
				<TableRow key={row.nipam}>
					<TableCell className="border" align="right">
						{++urut}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nama}</TableCell>
					<TableCell className="border text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border text-nowrap">{row.golongan}</TableCell>
					<TableCell className="border text-nowrap">{row.pangkat}</TableCell>
					<TableCell className="border text-nowrap">
						{row.tmt_golongan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.nama_jabatan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tmt_jabatan}
					</TableCell>
					<TableCell className="border text-nowrap">{row.tmt_kerja}</TableCell>
					<TableCell className="border text-nowrap" align="right">{row.mk_tahun}</TableCell>
					<TableCell className="border text-nowrap" align="right">{row.mk_bulan}</TableCell>
					<TableCell className="border text-nowrap">{row.jurusan}</TableCell>
					<TableCell className="border text-nowrap">
						{row.tahun_lulus}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tingkat_pendidikan}
					</TableCell>
					<TableCell className="border text-nowrap" align="right">{row.usia}</TableCell>
					<TableCell className="border text-nowrap">
						{row.status_pegawai}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default DukTableBody;
