import type { Pageable } from "@_types/index";
import type { Golongan } from "@_types/master/golongan";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

const GolonganTableBody = ({ data }: { data: Pageable<Golongan> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.golongan}</TableCell>
                    <TableCell className="border-x">{row.pangkat}</TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete Golongan"
                            action={hapus}
                            tag="golongan"
                        />
                        <ButtonEditBuilder
                            href={`/master/golongan/edit/${row.id}`}
                            msg="Edit Golongan"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default GolonganTableBody;