import type { Pageable } from "@_types/index";
import type { Tunjangan } from "@_types/penggajian/tunjangan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import TunjanganTableAction from "./button.table.action";

interface TunjanganTableBodyProps {
    data: Pageable<Tunjangan>
}
const TunjanganTableBody = ({ data }: TunjanganTableBodyProps) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="center" width={60} className="border-x whitespace-nowrap">
                        {urut++}
                    </TableCell>
                    <TableCell className="border-x whitespace-nowrap" width={60} align="center">
                        <TunjanganTableAction tunjanganId={row.id} />
                    </TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.jenisTunjangan}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.level.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.golongan?.golongan}-{row.golongan?.pangkat}</TableCell>
                    <TableCell className="border-x whitespace-nowrap" align="right">{rupiah(row.nominal)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default TunjanganTableBody;