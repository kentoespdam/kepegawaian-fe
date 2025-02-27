import {
	JENIS_GAJI,
	type JenisGaji,
	getKeyJenisGaji,
} from "@_types/enums/jenis_gaji";
import {
	type GajiBatchMasterProses,
	gajiBatchMasterProsesColumns,
	gajiBatchMasterProsesKomponenColumns,
} from "@_types/gaji_batch_master_process";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@components/ui/table";
import { rupiah } from "@helpers/number";

interface GajiBatchMasterProsesTableKomponenBodyProps {
	data: GajiBatchMasterProses[];
	jenisGaji: JenisGaji;
}
const GajiBatchMasterProsesKomponenTableBody = ({
	data,
	jenisGaji,
}: GajiBatchMasterProsesTableKomponenBodyProps) => {
	const filtered = data.filter(
		(item) => item.jenisGaji === getKeyJenisGaji(jenisGaji),
	);
	const penghasilan = data.find(
		(item) =>
			item.kode ===
			(jenisGaji === JENIS_GAJI.PEMASUKAN
				? "PENGHASILAN_KOTOR"
				: "TOTAL_POTONGAN"),
	);
	let urut = 1;
	return (
		<>
			<TableBody>
				{filtered.map((item) => (
					<TableRow key={`komponen-${item.id}`}>
						<TableCell className="border-x" align="right" width={45}>
							{urut++}
						</TableCell>
						<TableCell className="border-x">Aksi</TableCell>
						<TableCell className="border-x">{item.nama}</TableCell>
						<TableCell className="border-x" align="right">
							{rupiah(item.nilai)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell
						colSpan={gajiBatchMasterProsesKomponenColumns.length}
						className="border"
						align="right"
					>
						<span className="font-bold">{rupiah(penghasilan?.nilai ?? 0)}</span>
					</TableCell>
				</TableRow>
			</TableFooter>
		</>
	);
};

export default GajiBatchMasterProsesKomponenTableBody;
