import { STATUS_PROSES_GAJI } from "@_types/enums/status_proses_gaji";
import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import ProsesGajiTableAction from "./table.action";
import GajiBatchRootNotesCell from "./table.notes";
import { getNamaBulan } from "@helpers/tanggal";

const PeriodeCell = ({ periode }: { periode: string }) => {
    const tahun = periode.substring(0, 4);
    const bulan = Number(periode.substring(4, 6));
    return (
        <TableCell className="border-x whitespace-nowrap">
            {getNamaBulan(bulan)} {tahun}
        </TableCell>
    )
}

interface GajiBatchRootTableBodyProps {
    data: Pageable<GajiBatchRoot>,
    pegawai: Pegawai,
    qkey: string[]
}
const GajiBatchRootTableBody = ({ data, pegawai, qkey }: GajiBatchRootTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={40} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">
                        <ProsesGajiTableAction row={row} pegawai={pegawai} qkey={qkey} />
                    </TableCell>
                    <PeriodeCell periode={row.periode} />
                    <TableCell className="border-x whitespace-nowrap">{row.id}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{STATUS_PROSES_GAJI[row.status as keyof typeof STATUS_PROSES_GAJI]}</TableCell>
                    <GajiBatchRootNotesCell data={row} />
                    <TableCell className="border-x whitespace-nowrap">{row.tanggalProses}</TableCell>
                    <TableCell className="border-x" align="right">{row.totalPegawai}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.tanggalVerifikasiTahap1}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.tanggalVerifikasiTahap2}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.tanggalPersetujuan}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default GajiBatchRootTableBody;
