import type { Pageable } from "@_types/index";
import type { StatusKerja } from "@_types/master/status_kerja";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import { hapus } from "./action";

const StatusKerjaTableBody = ({ data }: { data: Pageable<StatusKerja> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete Status Kerja"
                            action={hapus}
                            tag="status_kerja"
                        />
                        <ButtonEditBuilder
                            href={`/master/status_kerja/edit/${row.id}`}
                            msg="Edit Status Kerja"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default StatusKerjaTableBody;