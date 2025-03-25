import type { Pageable } from "@_types/index";
import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { dateToIndonesian } from "@helpers/string";
import { cn } from "@lib/utils";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import RiwayatKontrakTableAction from "./button.table.action";

type RiwayatKontrakTableBodyProps = {
	pegawaiId: number;
	data: Pageable<RiwayatKontrak>;
};
const RiwayatKontrakTableBody = (props: RiwayatKontrakTableBodyProps) => {
	const { selectedDataId, setSelectedDataId } = useRiwayatKontrakStore(
		(state) => ({
			selectedDataId: state.selectedDataId,
			setSelectedDataId: state.setSelectedDataId,
		}),
	);
	const { ref, setRef, refId, setRefId } = useLampiranSkStore((state) => ({
		ref: state.ref,
		setRef: state.setRef,
		refId: state.refId,
		setRefId: state.setRefId,
	}));
	const handleSelect = (data: RiwayatKontrak) => {
		setSelectedDataId(selectedDataId === data.id ? 0 : data.id);
		setRefId(refId === data.id ? 0 : data.id);
		setRef(ref === data.jenisKontrak ? "" : data.jenisKontrak);
	};

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("hover:bg-gray-100 cursor-pointer", {
						"bg-gray-100": selectedDataId === row.id,
					})}
					onClick={() => handleSelect(row)}
				>
					<TableCell align="right" className="border-x" width={60}>
						{urut++}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" width={60} align="center">
						<RiwayatKontrakTableAction pegawaiId={props.pegawaiId} data={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nomorKontrak}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						{dateToIndonesian(row.tanggalSk)}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						{dateToIndonesian(row.tanggalMulai)}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="center">
						{dateToIndonesian(row.tanggalSelesai)}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default RiwayatKontrakTableBody;
