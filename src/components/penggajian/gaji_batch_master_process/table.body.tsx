import {
    type JenisGaji,
    getKeyJenisGaji
} from "@_types/enums/jenis_gaji";
import {
    type GajiBatchMasterProses,
    gajiBatchMasterProsesColumns,
} from "@_types/gaji_batch_master_process";
import {
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@components/ui/table";
import { rupiah } from "@helpers/number";

interface GajiBatchMasterProsesTableBodyProps {
	data: GajiBatchMasterProses[];
	jenisGaji: JenisGaji;
}
const GajiBatchMasterProsesTableBody = ({
	data,
	jenisGaji,
}: GajiBatchMasterProsesTableBodyProps) => {
	const filtered = data.filter(
		(item) => item.jenisGaji === getKeyJenisGaji(jenisGaji),
	);
	const penghasilan = filtered.reduce((total, item) => total + item.nilai, 0);
	let urut = 1;
	return (
		<>
			<TableBody>
				{filtered.map((item) => (
					<TableRow key={item.id}>
						<TableCell className="border-x" align="right" width={45}>
							{urut++}
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
						colSpan={gajiBatchMasterProsesColumns.length}
						className="border"
						align="right"
					>
						<span className="font-bold">{rupiah(penghasilan)}</span>
					</TableCell>
				</TableRow>
			</TableFooter>
		</>
	);
};

export default GajiBatchMasterProsesTableBody;
