import type { CutiKuotaPegawai } from "@_types/cuti/kuota";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import CutiKuotaTableAction from "./table.action";

type CutiKuotaTableProps = {
	data: CutiKuotaPegawai;
};
const CutiKuotaTable = ({ data }: CutiKuotaTableProps) => {
	const { page, additional } = data;

	let urut = getUrut(page);
	return (
		<TableBody>
			{page.content.map((row) => {
				const filteredAdditional = additional.find(
					(item) => item.pegawai.id === row.pegawai.id,
				);
				return (
					<TableRow key={row.id}>
						<TableCell align="right" width={60} className="border-x">
							{urut++}
						</TableCell>
						<TableCell className="border-x" align="center">
							<CutiKuotaTableAction data={row} />
						</TableCell>
						<TableCell className="border-x text-nowrap">
							{row.pegawai.nipam}
						</TableCell>
						<TableCell className="border-x text-nowrap">
							{row.pegawai.nama}
						</TableCell>
						<TableCell className="border-x text-nowrap">
							{row.pegawai.statusPegawai}
						</TableCell>
						<TableCell className="border-x text-nowrap">
							{row.pegawai.jabatan}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{row.kuota}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{row.kuotaTerpakai}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{row.sisaKuota}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{filteredAdditional?.kuota ?? "-"}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{filteredAdditional?.kuotaTerpakai ?? "-"}
						</TableCell>
						<TableCell
							className="border-x text-nowrap"
							align="right"
							width={60}
						>
							{filteredAdditional?.sisaKuota ?? "-"}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default CutiKuotaTable;
