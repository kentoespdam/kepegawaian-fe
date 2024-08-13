import type { CustomColumnDef } from "@_types/index";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

type LoadingTableProps = {
    columns: CustomColumnDef[],
    isLoading?: boolean
    error?: string
    isSuccess?: boolean
    isEmpty?: boolean
    isFetching?: boolean
}
const LoadingTable = ({ columns, isLoading, error, isEmpty, isFetching }: LoadingTableProps) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                    <div className="p-4 w-full animate-pulse rounded-md bg-muted inline-block align-middle text-center" >
                        <div className="font-extrabold text-[16px]">
                            {isLoading || isFetching ? "Loading..." : error || "No Data"}
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}
export default LoadingTable;