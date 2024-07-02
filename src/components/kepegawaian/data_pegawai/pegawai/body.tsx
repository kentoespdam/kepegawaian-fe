import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import KepegawaianTableAction from "../table-action";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";

type PegawaiTableBodyProps = {
    data: Pageable<Pegawai>
}
const PegawaiTableBody = ({ data }: PegawaiTableBodyProps) => {
    const { setPegawaiId, setPegawaiNik } = useRingkasanPegawaiStore()
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id} onClick={() => {
                    setPegawaiId(row.id)
                    setPegawaiNik(row.biodata.nik)
                }}>
                    <TableCell align="right" width={60} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">
                        <KepegawaianTableAction nik={row.biodata.nik} />
                    </TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.biodata.nama}</TableCell>
                    <TableCell className="border-x">{row.nipam}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.biodata.jenisKelamin.replace("_", " ")}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.golongan.golongan} - {row.golongan.pangkat}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.jabatan.nama}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.biodata.tanggalLahir}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.biodata.statusKawin.replace("_", " ")}</TableCell>
                    <TableCell className="border-x">{" "}</TableCell>
                    <TableCell className="border-x">{" "}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.statusPegawai.nama}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default PegawaiTableBody;