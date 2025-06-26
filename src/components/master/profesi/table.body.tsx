import type { Pageable } from "@_types/index";
import type { Profesi } from "@_types/master/profesi";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import ProfesiTableAction from "./button.table.action";
import AlatKerjaCellForm from "./table.alat.kerja.cell";
import ApdCellForm from "./table.apd.cell.form";

const ProfesiTableBody = ({ data }: { data: Pageable<Profesi> }) => {
	let urut = getUrut(data);

	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell align="center">
						<ProfesiTableAction profesiId={row.id} />
					</TableCell>
					<TableCell className="border-x text-nowrap">{row.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.organisasi.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.jabatan.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.level.nama}</TableCell>
					<TableCell className="border-x text-nowrap">Grade {row.grade.grade}</TableCell>
					<TableCell className="border-x text-nowrap">{row.detail}</TableCell>
					<TableCell className="border-x text-nowrap">{row.resiko}</TableCell>
					<TableCell className="border-x text-nowrap">
						<ApdCellForm profesiId={row.id} rows={row.apdList} />
					</TableCell>
					<TableCell className="border-x">
						<AlatKerjaCellForm profesiId={row.id} rows={row.alatKerjaList} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfesiTableBody;
