import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import type { Keluarga } from "@_types/profil/keluarga";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { CheckIcon, EllipsisIcon, XIcon } from "lucide-react";
import { memo, useCallback, useEffect, useMemo } from "react";
import KeluargaTableAction from "./table.action";

interface KeluargaTableBodyProps {
	biodata: Biodata;
	data: Pageable<Keluarga>;
	isKaryawanAktif: boolean;
}

const TableActionButton = memo(
	({
		isKaryawanAktif,
		biodata,
		row,
	}: {
		isKaryawanAktif: boolean;
		biodata: Biodata;
		row: Keluarga;
	}) => (
		<TableCell className="border-x p-0" align="center">
			{isKaryawanAktif ? (
				<KeluargaTableAction biodata={biodata} data={row} />
			) : (
				<Button
					variant="secondary"
					size="icon"
					className="size-5"
					aria-label="Menu aksi"
				>
					<EllipsisIcon className="size-4" />
				</Button>
			)}
		</TableCell>
	),
);

TableActionButton.displayName = "TableActionButton";

const DitanggungIcon = memo(({ isDitanggung }: { isDitanggung: boolean }) => {
	const tanggunganText = isDitanggung ? "Ditanggung" : "Tidak Ditanggung";
	const IconComponent = isDitanggung ? CheckIcon : XIcon;
	const iconStyle = isDitanggung ? "text-green-500" : "text-red-500";
	return (
		<TableCell className="border-x" align="center">
			<TooltipBuilder text={tanggunganText} className="bg-white text-black">
				<IconComponent className={`size-5 ${iconStyle}`} />
			</TooltipBuilder>
		</TableCell>
	);
});

DitanggungIcon.displayName = "DitanggungIcon";

const KeluargaTableBody = ({
	biodata,
	data,
	isKaryawanAktif,
}: KeluargaTableBodyProps) => {
	const { nik } = biodata;
	const { selectedKeluargaId, setSelectedKeluargaId } = useKeluargaStore(
		(state) => ({
			selectedKeluargaId: state.selectedKeluargaId,
			setSelectedKeluargaId: state.setSelectedKeluargaId,
		}),
	);
	const { setRefId, setNik } = useLampiranProfilStore((state) => ({
		setRefId: state.setRefId,
		setNik: state.setNik,
	}));

	const handleSelect = useCallback(
		(id: number) => {
			setSelectedKeluargaId(selectedKeluargaId === id ? 0 : id);
			setNik(nik);
		},
		[nik, selectedKeluargaId, setSelectedKeluargaId, setNik],
	);

	useEffect(() => {
		if (selectedKeluargaId) setRefId(selectedKeluargaId);
	}, [setRefId, selectedKeluargaId]);

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data);
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedKeluargaId === row.id,
		}));
	}, [data, selectedKeluargaId]);

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					key={row.id}
					className={cn(
						"transition-colors odd:bg-muted/50 hover:bg-green-100",
						{
							"bg-green-200 odd:bg-green-300 hover:bg-green-200":
								row.isSelected,
						},
						{
							"text-info": row.changedStatus,
						},
					)}
					onClick={() => handleSelect(row.id)}
				>
					<TableCell className="border-x" align="right">
						{row.urut}
					</TableCell>
					<TableActionButton
						row={row}
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<TableCell className="whitespace-nowrap border-x">
						{row.nik}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.jenisKelamin.replace("_", " ")}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.hubunganKeluarga}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.agama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.tempatLahir}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.tanggalLahir}
					</TableCell>
					<DitanggungIcon isDitanggung={row.tanggungan} />
					<TableCell className="whitespace-nowrap border-x capitalize">
						{row.statusPendidikan?.replace("_", " ")}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.pendidikan?.nama ?? "-"}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x capitalize">
						{row.statusKawin ? "Menikah" : "Belum Menikah"}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KeluargaTableBody;
