import type { Pageable } from "@_types/index";
import type { Grade } from "@_types/master/grade";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut, rupiah } from "@helpers/number";
import { hapus } from "./action";

const GradeTableBody = ({ data }: { data: Pageable<Grade> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.level.nama}</TableCell>
                    <TableCell align="center" className="border-x">Grade {row.grade}</TableCell>
                    <TableCell align="right" className="border-x">{rupiah(row.tukin)}</TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete Grade"
                            action={hapus}
                            tag="grade"
                        />
                        <ButtonEditBuilder
                            href={`/master/grade/edit/${row.id}`}
                            msg="Edit Grade"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default GradeTableBody;