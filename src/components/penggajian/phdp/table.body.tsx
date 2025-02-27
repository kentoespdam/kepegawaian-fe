import type { Pageable } from "@_types/index";
import type { Phdp } from "@_types/penggajian/phdp";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import PhdpTableActionButton from "./button.table.action";

interface PhdpTableBodyProps {
    data: Pageable<Phdp>
}
const PhdpTableBody = ({ data }: PhdpTableBodyProps) => {
    let no = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={40} className="border-x">{no++}</TableCell>
                    <TableCell className="border-x" width={60} align="center">
                        <PhdpTableActionButton parameterSettingId={row.id} />
                    </TableCell>
                    <TableCell className="border-x" align="right" width={40}>{row.urut}</TableCell>
                    <TableCell className="border-x">{row.kondisi}</TableCell>
                    <TableCell className="border-x">{row.formula}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default PhdpTableBody;