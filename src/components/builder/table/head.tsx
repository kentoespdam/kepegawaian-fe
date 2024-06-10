import { TableHead, TableHeader, TableRow } from "@components/ui/table";
import type { CustomColumnDef } from "@_types/index";

type TableHeadBuilderProps = {
    columns: CustomColumnDef[];
};
const TableHeadBuilder = ({ columns }: TableHeadBuilderProps) => (
    <TableHeader>
        <TableRow>
            {columns.map((head) => (
                <TableHead key={head.id} className="text-center">
                    <div className="grid justify-items-center">{head.label}</div>
                </TableHead>
            ))}
        </TableRow>
    </TableHeader>
);

export default TableHeadBuilder;

