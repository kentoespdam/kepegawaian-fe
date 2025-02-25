import type { Pageable } from "@_types/index";
import type { RefPotonganTkk } from "@_types/penggajian/ref_potongan_tkk";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import RefPotonganTkkTableAction from "./table.action";

interface RefPotonganTkkTableBodyProps {
    data: Pageable<RefPotonganTkk>
}
const RefPotonganTkkTableBody = ({ data }: RefPotonganTkkTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={40} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x" align="center" width={60}>
                        <RefPotonganTkkTableAction refPotonganTkkId={row.id} />
                    </TableCell>
                    <TableCell className="border-x">{row.statusPegawai}</TableCell>
                    <TableCell className="border-x">{row.level?.nama}</TableCell>
                    <TableCell className="border-x">{row.golongan?.pangkat} - {row.golongan?.golongan}</TableCell>
                    <TableCell className="border-x" align="right">{rupiah(row.nominal)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default RefPotonganTkkTableBody;