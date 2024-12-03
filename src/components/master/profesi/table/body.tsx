import type { Pageable } from "@_types/index";
import type { AlatKerjaMini } from "@_types/master/alat_kerja";
import type { Apd } from "@_types/master/apd";
import type { Profesi } from "@_types/master/profesi";
import { Badge } from "@components/ui/badge";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import ProfesiTableAction from "../button/table-action";
import ApdCellForm from "./apd_cell_form";
import AlatKerjaCellForm from "./alat_kerja_cell";

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
                    <TableCell align="center">
                        <ProfesiTableAction profesiId={row.id} />
                    </TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell className="border-x">{row.organisasi.nama}</TableCell>
                    <TableCell className="border-x">{row.jabatan.nama}</TableCell>
                    <TableCell className="border-x">{row.level.nama}</TableCell>
                    <TableCell className="border-x">Grade {row.grade.grade}</TableCell>
                    <TableCell className="border-x">{row.detail}</TableCell>
                    <TableCell className="border-x">{row.resiko}</TableCell>
                    <TableCell className="border-x">
                        <ApdCellForm profesiId={row.id} rows={row.apdList} />
                    </TableCell>
                    <TableCell className="border-x">
                        <AlatKerjaCellForm profesiId={row.id} rows={row.alatKerjaList} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ProfesiTableBody;