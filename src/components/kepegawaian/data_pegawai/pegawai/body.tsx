import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";

type PegawaiTableBodyProps = {
    data: Pageable<Pegawai>
}
const PegawaiTableBody = ({ data }: PegawaiTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">{row.nipam}</TableCell>
                    <TableCell className="border-x">{row.biodata.nik}</TableCell>
                    <TableCell className="border-x">{row.biodata.nama}</TableCell>
                    <TableCell className="border-x">{row.biodata.jenisKelamin}</TableCell>
                    <TableCell className="border-x">{row.golongan.golongan} - {row.golongan.pangkat}</TableCell>
                    <TableCell className="border-x">{row.jabatan.nama}</TableCell>
                    <TableCell className="border-x">{row.biodata.tanggalLahir}</TableCell>
                    <TableCell className="border-x">{row.biodata.statusKawin}</TableCell>
                    <TableCell className="border-x">{" "}</TableCell>
                    <TableCell className="border-x">{" "}</TableCell>
                    <TableCell className="border-x">{row.statusPegawai.nama}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default PegawaiTableBody;