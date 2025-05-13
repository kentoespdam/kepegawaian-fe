import type { DNP } from "@_types/laporan/kepegawaian/dnp";
import { TableCell, TableRow } from "@components/ui/table";

interface DnpTableBodySubProps {
	maxUrut: number;
	dnpList: DNP[];
}
const DnpTableBodySub = ({ maxUrut, dnpList }: DnpTableBodySubProps) => {
	let _urut = maxUrut - dnpList.length;
	let urut = 1;
	return dnpList.map((item) => (
		<TableRow key={item.nipam}>
			<TableCell className="border">{_urut++}</TableCell>
			<TableCell className="border">{urut++}</TableCell>
			<TableCell className="border text-nowrap">{item.nama}</TableCell>
			<TableCell className="border">{item.nipam}</TableCell>
			<TableCell className="border text-nowrap">{item.nama_jabatan}</TableCell>
			<TableCell className="border" align="center">
				{item.tmt_jabatan}
			</TableCell>
			<TableCell className="border text-nowrap">{item.pangkat}</TableCell>
			<TableCell className="border">{item.golongan}</TableCell>
			<TableCell className="border" align="center">
				{item.tmt_golongan}
			</TableCell>
			<TableCell className="border">{item.mkg_tahun}</TableCell>
			<TableCell className="border">{item.mkg_bulan}</TableCell>
			<TableCell className="border" align="center">
				{item.tmt_kerja}
			</TableCell>
			<TableCell className="border">{item.mk_tahun}</TableCell>
			<TableCell className="border">{item.mk_bulan}</TableCell>
			<TableCell className="border text-nowrap">{item.pendidikan}</TableCell>
			<TableCell className="border text-nowrap">{item.ttl}</TableCell>
		</TableRow>
	));
};

export default DnpTableBodySub;
