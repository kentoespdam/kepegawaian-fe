import { type Mutasi, lapMutasiColumns } from "@_types/kepegawaian/mutasi";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import LapMutasiTableBody from "./table.body";

type LapMutasiTableProps = {
	data?: Mutasi[];
};
const LapMutasiTable = ({ data }: LapMutasiTableProps) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<TableHeadBuilder columns={lapMutasiColumns} />
				{!data ? (
					<LoadingTable columns={lapMutasiColumns} isSuccess={false} />
				) : (
					<LapMutasiTableBody data={data} />
				)}
			</Table>
		</div>
	);
};

export default LapMutasiTable;
