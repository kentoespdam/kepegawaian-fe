import {
	type Kontrak,
	lapKotrakColumns,
} from "@_types/laporan/kepegawaian/kontrak";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import LapKontrakTableBody from "./table.body";

type LapKontrakComponentProps = {
	data?: Kontrak[];
};
const LapKontrakTable = ({ data }: LapKontrakComponentProps) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<TableHeadBuilder columns={lapKotrakColumns} />
				{!data ? (
					<LoadingTable columns={lapKotrakColumns} isSuccess={false} />
				) : (
					<LapKontrakTableBody data={data} />
				)}
			</Table>
		</div>
	);
};

export default LapKontrakTable;
