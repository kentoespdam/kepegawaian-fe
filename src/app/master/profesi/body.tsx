import type { Pageable } from "@_types/index";
import type { Profesi } from "@_types/master/profesi";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";
import type { Apd } from "@_types/master/apd";
import { Badge } from "@components/ui/badge";
import type { AlatKerjaMini } from "@_types/master/alat_kerja";

type ProfesiBadgeBuilderProps = {
    rows: Apd[] | AlatKerjaMini[] | null
}

const ProfesiBadgeBuilder = ({ rows }: ProfesiBadgeBuilderProps) => {
    if (rows === null || rows.length === 0)
        return null;

    return (
        <>
            <div className="grid grid-cols-3 gap-2">
                {rows.map((row) => (
                    <Badge key={row.id}>{row.nama}</Badge>
                ))}
            </div>
        </>
    )
}


const ProfesiTableBody = ({ data }: { data: Pageable<Profesi> }) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.level.nama}</TableCell>
                    <TableCell className="border-x">Profesi {row.nama}</TableCell>
                    <TableCell className="border-x">{row.detail}</TableCell>
                    <TableCell className="border-x">{row.resiko}</TableCell>
                    <TableCell className="border-x">
                        <ProfesiBadgeBuilder rows={row.apdList} />
                    </TableCell>
                    <TableCell className="border-x">
                        <ProfesiBadgeBuilder rows={row.alatKerjaList} />
                    </TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete Profesi"
                            action={hapus}
                            tag="profesi"
                        />
                        <ButtonEditBuilder
                            href={`/master/profesi/edit/${row.id}`}
                            msg="Edit Profesi"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ProfesiTableBody;