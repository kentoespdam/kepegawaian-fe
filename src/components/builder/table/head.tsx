import { TableHead, TableHeader, TableRow } from "@components/ui/table";
import type { CustomColumnDef } from "@_types/index";
import { cn } from "@lib/utils";

type TableHeadBuilderProps = {
    columns: CustomColumnDef[];
};
const TableHeadBuilder = ({ columns }: TableHeadBuilderProps) => (
    <TableHeader>
        <TableRow>
            {columns.map((head, index) => (
                <TableHead key={head.id} className={cn("text-center bg-primary text-primary-foreground border-x",
                    index === 0 && "rounded-ss-lg border-l-0",
                    index === columns.length - 1 && "rounded-se-lg border-r-0")}>
                    {head.label}
                </TableHead>
            ))}
        </TableRow>
    </TableHeader>
);

export default TableHeadBuilder;

