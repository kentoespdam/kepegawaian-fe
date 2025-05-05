import type { Pageable } from "@_types/index";
import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import RiwayatSpTableAction from "./button.table.action";
import RiwayatSpLampiranFileButton from "./button.file";

interface SanksiCellProps {
	data: RiwayatSp;
}
const SanksiCell = ({ data }: SanksiCellProps) => {
	return (
		<TableCell className="border-x whitespace-nowrap">
			{data.sanksi.kode} - {data.sanksi.keterangan}
		</TableCell>
	);
};

type RiwayatSpTableBodyProps = {
	pegawaiId: number;
	data: Pageable<RiwayatSp>;
};
const RiwayatSpTableBody = ({ pegawaiId, data }: RiwayatSpTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell
						align="center"
						className="border-x whitespace-nowrap align-middle"
					>
						<RiwayatSpTableAction pegawaiId={pegawaiId} data={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nomorSp}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tanggalSp}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.jenisSp.kode} - {row.jenisSp.nama}
					</TableCell>
					<SanksiCell data={row} />
					<TableCell className="border-x whitespace-nowrap">
						{row.tanggalMulai}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tanggalSelesai}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
					<TableCell align="center" className="border-x whitespace-nowrap">
						<RiwayatSpLampiranFileButton data={row} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default RiwayatSpTableBody;
