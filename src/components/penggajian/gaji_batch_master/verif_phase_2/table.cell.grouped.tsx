import type { Organisasi } from "@_types/master/organisasi";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { verifPhase2Columns } from "@_types/penggajian/verif_phase2";
import { TableCell, TableRow } from "@components/ui/table";
import { rupiah } from "@helpers/number";
import { cn } from "@lib/utils";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";

interface VerifPhase2CellGroupedProps {
	urut: number;
	urutOrg: string;
	organisasi: Organisasi;
	gajiBatchMasters?: GajiBatchMaster[];
}
const VerifPhase2CellGrouped = ({
	urut,
	urutOrg,
	organisasi,
	gajiBatchMasters,
}: VerifPhase2CellGroupedProps) => {
	const { batchMasterId, setBatchMasterId } = useGajiBatchMasterProsesStore(
		(state) => ({
			batchMasterId: state.batchMasterId,
			setBatchMasterId: state.setBatchMasterId,
		}),
	);

	const dataSize = gajiBatchMasters?.length ?? 0;
	let startUrut = urut - dataSize + 1;

	const handleSelect = (currBatchMasterId: number) => {
		if (batchMasterId === currBatchMasterId) setBatchMasterId();
		else setBatchMasterId(currBatchMasterId);
	};
	return (
		<>
			<TableRow
				key={`header-${organisasi.id}`}
				className="bg-green-500 text-white hover:bg-green-500 hover:text-white"
			>
				<TableCell colSpan={verifPhase2Columns.length} className="border-x">
					{`${urutOrg}. ${organisasi.nama}`}
				</TableCell>
			</TableRow>
			{gajiBatchMasters?.map((gbm) => {
				return (
					<TableRow
						key={`data-${gbm.id}`}
						onClick={() => handleSelect(gbm.id)}
						className={cn("cursor-pointer odd:bg-muted hover:bg-green-200", {
							"bg-green-300 odd:bg-green-300": batchMasterId === gbm.id,
						})}
					>
						<TableCell key={gbm.id} className="border-x" align="right">
							{startUrut++}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap">
							{gbm.nipam}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap">
							{gbm.nama}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap">
							{gbm.namaJabatan}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.penghasilanKotor)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.totalPotongan)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.pembulatan)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.penghasilanBersih)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.totalAddTambahan)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.totalAddPotongan)}
						</TableCell>
						<TableCell className="border-x whitespace-nowrap" align="right">
							{rupiah(gbm.penghasilanBersihFinal2)}
						</TableCell>
					</TableRow>
				);
			})}
		</>
	);
};

export default VerifPhase2CellGrouped;
