import type { Pageable } from "@_types/index";
import type { RiwayatSk } from "@_types/kepegawaian/riwayat_sk";
import type { JenisSk } from "@_types/master/jenis_sk";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import RiwayatSkActionButton from "./button.table.action";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { cn } from "@lib/utils";
import { useEffect } from "react";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";

type RiwayatSkTableBodyProps = {
	pegawaiId: number;
	data: Pageable<RiwayatSk>;
	jenisSkList: JenisSk[];
};
const RiwayatSkTableBody = ({
	pegawaiId,
	data,
	jenisSkList,
}: RiwayatSkTableBodyProps) => {
	const { selectedDataId, setSelectedDataId } = useRiwayatSkStore((state) => ({
		selectedDataId: state.selectedDataId,
		setSelectedDataId: state.setSelectedDataId,
	}));

	const { ref, setRef, refId, setRefId } = useLampiranSkStore((state) => ({
		ref: state.ref,
		setRef: state.setRef,
		refId: state.refId,
		setRefId: state.setRefId,
	}));

	const handleSelect = (data: RiwayatSk) => {
		setSelectedDataId(selectedDataId === data.id ? 0 : data.id);
		setRefId(refId === data.id ? 0 : data.id);
		setRef(ref === data.jenisSk ? "" : data.jenisSk);
	};

	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow
					key={row.id}
					className={cn("even:bg-muted hover:bg-green-200", {
						"bg-green-300 even:bg-green-300": selectedDataId === row.id,
					})}
					onClick={() => handleSelect(row)}
				>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell align="center" className="border-x whitespace-nowrap">
						<RiwayatSkActionButton pegawaiId={pegawaiId} data={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nomorSk}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{jenisSkList.find((x) => x.id === row.jenisSk)?.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tanggalSk}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.tmtBerlaku}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.golongan?.golongan} - {row.golongan?.pangkat}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" align="right">
						{rupiah(row.gajiPokok)}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.mkgTahun} Thn - {row.mkgBulan} Bln
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.kenaikanBerikutnya}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.mkgbTahun} Thn - {row.mkgbBulan} Bln
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default RiwayatSkTableBody;
