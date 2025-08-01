import type { CustomColumnDef } from "@_types/index";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

type LoadingTableProps = {
	columns: CustomColumnDef[] | number;
	isLoading?: boolean;
	error?: string;
	isSuccess?: boolean;
	isFetching?: boolean;
};
const LoadingTable = ({
	columns,
	isLoading,
	error,
	isFetching,
}: LoadingTableProps) => {
	const columnLenength = Array.isArray(columns) ? columns.length : columns;
	return (
		<TableBody>
			<TableRow>
				<TableCell colSpan={columnLenength} className="p-0">
					<div className="p-4 w-full animate-pulse rounded-md bg-muted inline-block align-middle text-center">
						<div className="font-extrabold text-[16px]">
							{isLoading || isFetching ? "Loading..." : error || "No Data"}
						</div>
					</div>
				</TableCell>
			</TableRow>
		</TableBody>
	);
};
export default LoadingTable;
