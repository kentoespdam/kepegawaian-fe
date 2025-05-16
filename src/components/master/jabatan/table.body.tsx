import type { Pageable } from "@_types/index";
import type { Jabatan } from "@_types/master/jabatan";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import JabatanTableAction from "./table.action";

const JabatanTableBody = ({ data }: { data: Pageable<Jabatan> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.kode}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.parent?.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.organisasi.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.level.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">
                        <JabatanTableAction data={row} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default JabatanTableBody;