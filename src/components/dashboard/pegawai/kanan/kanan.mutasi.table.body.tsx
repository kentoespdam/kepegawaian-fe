import type { Pageable } from "@_types/index";
import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi";
import MutasiGolonganCell from "@components/kepegawaian/detail/mutasi/table.golongan.cell";
import MutasiJabatanCell from "@components/kepegawaian/detail/mutasi/table.jabatan.cell";
import MutasiOrganisasiCell from "@components/kepegawaian/detail/mutasi/table.organisasi.cell";
import RiwayatMutasiSKCell from "@components/kepegawaian/detail/mutasi/table.sk.cell";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";

type KananDataMutasiTableBodyProps = {
	pegawaiId: number;
	data: Pageable<RiwayatMutasi>;
};
const KananDataMutasiTableBody = (props: KananDataMutasiTableBodyProps) => {
	const { selectedDataId, setSelectedDataId } = useRiwayatMutasiStore(
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

	const handleSelect = (data: RiwayatMutasi) => {
		setSelectedDataId(selectedDataId === data.id ? 0 : data.id);
		setRefId(refId === data.skMutasi.id ? 0 : data.skMutasi.id);
		setRef(ref === data.skMutasi.jenisSk ? "" : data.skMutasi.jenisSk);
	};

	let urut = getUrut(props.data);

	return (
		<TableBody>
			{props.data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("even:bg-muted hover:bg-green-200", {
						"bg-green-300 even:bg-green-300": selectedDataId === row.id,
					})}
					onClick={() => handleSelect(row)}
				>
					<TableCell align="right" className="border-x">
						{urut++}
					</TableCell>
					<RiwayatMutasiSKCell row={row} />
					<TableCell className="border-x whitespace-nowrap">
						{row.jenisMutasi.replaceAll("_", " ").replace("MUTASI", "")}
					</TableCell>
					<MutasiGolonganCell row={row} />
					<MutasiOrganisasiCell row={row} />
					<MutasiJabatanCell row={row} />
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KananDataMutasiTableBody;
