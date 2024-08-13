import type { Pageable } from "@_types/index";
import type { Organisasi } from "@_types/master/organisasi";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";
import { useSearchParams } from "next/navigation";

const OrganisasiTableBody = ({ data }: { data: Pageable<Organisasi> }) => {
    let urut = getUrut(data)
    const searchParams=useSearchParams()
    const search=new URLSearchParams(searchParams)

    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.parent?.nama}</TableCell>
                    <TableCell className="border-x" align="center">{row.levelOrganisasi}</TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell align="center" className="border-x">
                        <ButtonDeleteBuilder
                            id={row.id}
                            msg="Delete Organisasi"
                            action={hapus}
                            tag="organisasi"
                        />
                        <ButtonEditBuilder
                            href={`/master/organisasi/edit/${row.id}?${search.toString()}`}
                            msg="Edit Organisasi"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default OrganisasiTableBody;