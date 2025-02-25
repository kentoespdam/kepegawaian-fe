import type { Pageable } from "@_types/index";
import type { Organisasi } from "@_types/master/organisasi";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import OrganisasiTableAction from "./table.action";

const OrganisasiTableBody = ({ data }: { data: Pageable<Organisasi> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.kode}</TableCell>
                    <TableCell className="border-x">{row.parent?.nama}</TableCell>
                    <TableCell className="border-x" align="center">{row.levelOrganisasi}</TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell align="center" className="border-x">
                        <OrganisasiTableAction data={row} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default OrganisasiTableBody;