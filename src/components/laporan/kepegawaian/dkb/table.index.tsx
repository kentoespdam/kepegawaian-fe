import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import LapKenaikanBerkalaTableHeader from "./table.head";
import LapKenaikanBerkalaTableBody from "./table.body";

const LapKenaikanBerkalaTable = ({ data }: { data?: KenaikanBerkala[] }) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<LapKenaikanBerkalaTableHeader />
				{!data ? (
					<TableBody>
						<TableRow>
							<TableCell colSpan={15} className="p-0">
								<div className="p-4 w-full animate-pulse rounded-md bg-muted inline-block align-middle text-center">
									<div className="font-extrabold text-[16px]">No Data</div>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				) : (
					<LapKenaikanBerkalaTableBody data={data} />
				)}
			</Table>
		</div>
	);
};

export default LapKenaikanBerkalaTable;
