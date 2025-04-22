import {
	JENIS_GAJI,
	type JenisGaji,
	getKeyJenisGaji,
} from "@_types/enums/jenis_gaji";
import {
	type GajiBatchMasterProses,
	gajiBatchMasterProsesKomponenColumns,
} from "@_types/gaji_batch_master_process";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@components/ui/table";
import { rupiah } from "@helpers/number";
import GajiBatchMasterProsesKomponenTableAction from "./button.action.table.komponen";

interface GajiBatchMasterProsesTableKomponenBodyProps {
	data: GajiBatchMasterProses[];
	jenisGaji: JenisGaji;
	isVerified: boolean;
	gajiBatchMaster?: GajiBatchMaster;
}
const GajiBatchMasterProsesKomponenTableBody = ({
	data,
	jenisGaji,
	isVerified,
	gajiBatchMaster,
}: GajiBatchMasterProsesTableKomponenBodyProps) => {
	const filtered = data.filter(
		(item) => item.jenisGaji === getKeyJenisGaji(jenisGaji),
	);
	const penghasilan =
		jenisGaji === JENIS_GAJI.PEMASUKAN
			? (gajiBatchMaster?.penghasilanKotor ?? 0) +
				(gajiBatchMaster?.totalAddTambahan ?? 0)
			: (gajiBatchMaster?.totalPotongan ?? 0) +
				(gajiBatchMaster?.totalAddPotongan ?? 0);
	let urut = 1;

	return (
		<>
			<TableBody>
				{filtered.map((item) => (
					<TableRow key={`komponen-${item.id}`}>
						<TableCell className="border-x" align="right" width={45}>
							{urut++}
						</TableCell>
						<TableCell className="border-x" align="center" width={45}>
							<GajiBatchMasterProsesKomponenTableAction 
							batchMasterProsesId={item.id} 
							kode={item.kode}
							isVerified={isVerified}
							/>
						</TableCell>
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
						<span className="font-bold">{rupiah(penghasilan ?? 0)}</span>
					</TableCell>
				</TableRow>
			</TableFooter>
		</>
	);
};

export default GajiBatchMasterProsesKomponenTableBody;
