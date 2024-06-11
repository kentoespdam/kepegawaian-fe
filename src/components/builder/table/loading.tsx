import { CustomColumnDef } from "@_types/index";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

type LoadingTableProps = {
    columns: CustomColumnDef[],
    isLoading?: boolean
    error?: string
}
const LoadingTable = ({ columns, isLoading, error }: LoadingTableProps) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={columns.length}>
                    <div className="p-4 w-full animate-pulse rounded-md bg-muted inline-block align-middle text-center" >
                        <div>
                            {isLoading ? "Loading..." : error || "No Data"}
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}
export default LoadingTable;