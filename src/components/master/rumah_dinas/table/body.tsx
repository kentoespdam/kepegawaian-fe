import type { Pageable } from "@_types/index";
import type { RumahDinas } from "@_types/master/rumah_dinas";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import RumahDinasTableAction from "../button/table_action_button";

interface RumahDinasTableBodyProps {
    data: Pageable<RumahDinas>
}
const RumahDinasTableBody = ({ data }: RumahDinasTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell align="center" width={60} className="border-x">
                        <RumahDinasTableAction rumahDinasId={row.id} />
                    </TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell className="border-x">{rupiah(row.nilai)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default RumahDinasTableBody;