import type { Pageable } from "@_types/index";
import type { Apd } from "@_types/master/apd";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "../action";

const ApdTableBody = ({ data }: { data: Pageable<Apd> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.profesi.nama}</TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete APD"
                            action={hapus}
                            tag="apd"
                        />
                        <ButtonEditBuilder
                            href={`/master/apd/edit/${row.id}`}
                            msg="Edit APD"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ApdTableBody;