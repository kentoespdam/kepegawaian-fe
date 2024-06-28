import type { Pageable } from "@_types/index";
import type { Biodata } from "@_types/profil/biodata";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";

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
                    <TableCell className="border-x">{row.nik}</TableCell>
                    <TableCell className="border-x">{row.nama}</TableCell>
                    <TableCell className="border-x">{row.jenisKelamin}</TableCell>
                    <TableCell className="border-x">{row.tanggalLahir}</TableCell>
                    <TableCell className="border-x">{row.alamat}</TableCell>
                    <TableCell className="border-x">{row.telp}</TableCell>
                    <TableCell className="border-x">{row.agama}</TableCell>
                    <TableCell className="border-x">{row.ibuKandung}</TableCell>
                    <TableCell className="border-x">{row.pendidikanTerakhir?.nama}</TableCell>
                    <TableCell className="border-x">{row.golonganDarah}</TableCell>
                    <TableCell className="border-x">{row.statusKawin}</TableCell>
                    <TableCell className="border-x">{row.notes}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default NonPegawaiTableBody;