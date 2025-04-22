import type { Pageable } from "@_types/index";
import { jenisGajiString, type KomponenGaji } from "@_types/penggajian/komponen";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import KomponenGajiTableAction from "./button.table.action";
import { cn } from "@lib/utils";

interface KomponenGajiTableBodyProps {
    data: Pageable<KomponenGaji>
}
const KomponenGajiTableBody = ({ data }: KomponenGajiTableBodyProps) => {
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id} className={cn("odd:bg-muted", row.isReference && "text-blue-600")}>
                    <TableCell className="border" align="center" width={60}>
                        <KomponenGajiTableAction row={row} />
                    </TableCell>
                    <TableCell className="border" align="right" width={40}>{row.urut}</TableCell>
                    <TableCell className="border">{row.kode}</TableCell>
                    <TableCell className="border">{row.nama}</TableCell>
                    <TableCell className="border">{jenisGajiString(row.jenisGaji)}</TableCell>
                    <TableCell className="border" align="right">{row.nilai}</TableCell>
                    <TableCell className="border">{row.formula}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default KomponenGajiTableBody;