import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import KepegawaianTableAction from "../table-action";

type NonPegawaiTableBodyProps = {
    data: Pageable<Biodata>
}
const NonPegawaiTableBody = ({ data }: NonPegawaiTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.nik}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">
                        <KepegawaianTableAction nik={row.nik} />
                    </TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.nama}</TableCell>
                    <TableCell className="border-x">{row.nik}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.jenisKelamin.replace("_", " ")}</TableCell>
                    <TableCell className="border-x">{row.tempatLahir}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.tanggalLahir}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.alamat}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.agama}</TableCell>
                    <TableCell className="border-x">{row.ibuKandung}</TableCell>
                    <TableCell className="border-x">{row.pendidikanTerakhir?.nama}</TableCell>
                    <TableCell className="border-x">{row.golonganDarah}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.statusKawin.replace("_", " ")}</TableCell>
                    <TableCell className="border-x">{row.notes}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default NonPegawaiTableBody;