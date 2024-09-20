import type { Pageable } from "@_types/index";
import {
	riwayatMutasiTableColumns,
	type RiwayatMutasi,
} from "@_types/kepegawaian/riwayat-mutasi";
import { type JenisMutasi, mutasiGetName } from "@_types/master/jenis_mutasi";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import MutasiGolonganCell from "./golongan_cell";
import MutasiJabatanCell from "./jabatan_cell";
import MutasiOrganisasiCell from "./organisasi_cell";
import RiwayatMutasiSKCell from "./sk_cell";
import { useQuery } from "@tanstack/react-query";
import { globalGetData } from "@helpers/action";
import { useSearchParams } from "next/navigation";
import LoadingTable from "@components/builder/table/loading";

export interface MutasiRowProps {
	row: RiwayatMutasi;
}

type RiwayatMutasiTableBodyProps = {
	pegawaiId: number;
	data: Pageable<RiwayatMutasi>;
};
const RiwayatMutasiTableBody = (props: RiwayatMutasiTableBodyProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

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
					<TableCell className="border-x whitespace-nowrap">Aksi</TableCell>
					<RiwayatMutasiSKCell row={row} />
					<TableCell className="border-x whitespace-nowrap">
						{row.namaJenisMutasi}
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

export default RiwayatMutasiTableBody;
