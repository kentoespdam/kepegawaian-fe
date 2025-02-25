import { PROSES_GAJI } from "@_types/enums/proses_gaji";
import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import ProsesGajiTableAction from "./table.action";
import GajiBatchRootNotesCell from "./table.notes";

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
                <TableRow key={row.batchId}>
                    <TableCell align="right" width={40} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x">
                        <ProsesGajiTableAction row={row} pegawai={pegawai} qkey={qkey} />
                    </TableCell>
                    <TableCell className="border-x">{row.periode}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{row.batchId}</TableCell>
                    <TableCell className="border-x whitespace-nowrap">{PROSES_GAJI[row.status as keyof typeof PROSES_GAJI]}</TableCell>
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
