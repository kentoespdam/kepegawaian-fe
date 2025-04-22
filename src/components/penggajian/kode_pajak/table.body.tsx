import type { Pageable } from "@_types/index";
import type { PendapatanNonPajak } from "@_types/penggajian/pendapatan_non_pajak";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import PendapatanNonPajakTableActionButton from "./button.table.action";
import { rupiah } from "@helpers/number";

interface PendapatanNonPajakTableBodyProps {
    data: Pageable<PendapatanNonPajak>
}
const PendapatanNonPajakTableBody = ({ data }: PendapatanNonPajakTableBodyProps) => {
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.kode}>
                    <TableCell align="center" width={60} className="border-x whitespace-nowrap">
                        <PendapatanNonPajakTableActionButton kodePajakId={row.id} />
                    </TableCell>
                    <TableCell width={100} className="border-x whitespace-nowrap">{row.kode}</TableCell>
                    <TableCell width={125} align="right" className="border-x whitespace-nowrap">{rupiah(row.nominal)}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.notes}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default PendapatanNonPajakTableBody;