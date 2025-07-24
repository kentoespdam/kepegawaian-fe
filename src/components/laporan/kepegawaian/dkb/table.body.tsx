import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

const LapKenaikanBerkalaTableBody = ({ data }: { data: KenaikanBerkala[] }) => {
	let urut = 1;
	return (
		<TableBody>
			{data.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border" align="right">
						{urut++}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nama}</TableCell>
					<TableCell className="border text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border text-nowrap">
						{row.tmt_jabatan}
					</TableCell>
					<TableCell className="border text-nowrap">{row.pangkat}</TableCell>
					<TableCell className="border text-nowrap">{row.golongan}</TableCell>
					<TableCell className="border text-nowrap">
						{row.tmt_golongan}
					</TableCell>
					<TableCell className="border text-nowrap">{row.mkg_tahun}</TableCell>
					<TableCell className="border text-nowrap">{row.mkg_bulan}</TableCell>
					<TableCell className="border text-nowrap">{row.tmt_kerja}</TableCell>
					<TableCell className="border text-nowrap">{row.mk_tahun}</TableCell>
					<TableCell className="border text-nowrap">{row.mk_bulan}</TableCell>
					<TableCell className="border text-nowrap">
						{row.pendidikan_terakhir}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.tempat_lahir}, {row.tanggal_lahir}
					</TableCell>
					<TableCell className="border text-nowrap">&nbsp;</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LapKenaikanBerkalaTableBody;
