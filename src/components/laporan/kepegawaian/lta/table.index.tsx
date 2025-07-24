import {
	type LepasTanggunganAnak,
	lapLtaColumns,
} from "@_types/laporan/kepegawaian/lta";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import LapLtaTableBody from "./table.body";

const LapLtaTable = ({ data }: { data?: LepasTanggunganAnak[] }) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<TableHeadBuilder columns={lapLtaColumns} />
				{!data ? (
					<LoadingTable columns={lapLtaColumns} isSuccess={false} />
				) : (
					<LapLtaTableBody data={data} />
				)}
			</Table>
		</div>
	);
};

export default LapLtaTable;
