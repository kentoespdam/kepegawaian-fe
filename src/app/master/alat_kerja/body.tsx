import type { Pageable } from "@_types/index";
import type { AlatKerja } from "@_types/master/alat_kerja";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

const AlatKerjaTableBody = ({ data }: { data: Pageable<AlatKerja> }) => {
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
                            msg="Delete Alat Kerja"
                            action={hapus}
                            tag="alat_kerja"
                        />
                        <ButtonEditBuilder
                            href={`/master/alat_kerja/edit/${row.id}`}
                            msg="Edit Alat Kerja"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default AlatKerjaTableBody;