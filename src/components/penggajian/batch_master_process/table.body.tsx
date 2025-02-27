import { JENIS_GAJI, getKeyJenisGaji, type JenisGaji } from "@_types/enums/jenis_gaji";
import { gajiBatchMasterProsesColumns, type GajiBatchMasterProses } from "@_types/gaji_batch_master_process";
import { TableBody, TableCell, TableFooter, TableRow } from "@components/ui/table";
import { rupiah } from "@helpers/number";

interface GajiBatchMasterProsesTableBodyProps {
    data: GajiBatchMasterProses[],
    jenisGaji: JenisGaji
}
const GajiBatchMasterProsesTableBody = ({ data, jenisGaji }: GajiBatchMasterProsesTableBodyProps) => {
    const filtered = data.filter(item => item.jenisGaji === getKeyJenisGaji(jenisGaji))
    const penghasilan = data.find(item => item.kode === (jenisGaji === JENIS_GAJI.PEMASUKAN ? "PENGHASILAN_KOTOR" : "TOTAL_POTONGAN"))
    let urut = 1;
    return (
        <>
            <TableBody>
                {filtered.map(item => (
                    <TableRow key={item.id}>
                        <TableCell className="border-x" align="right" width={45}>{urut++}</TableCell>
                        <TableCell className="border-x">{item.nama}</TableCell>
                        <TableCell className="border-x" align="right">{rupiah(item.nilai)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={gajiBatchMasterProsesColumns.length}
                        className="border"
                        align="right">
                        <span className="font-bold">{rupiah(penghasilan?.nilai ?? 0)}</span>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </>
    );
}

export default GajiBatchMasterProsesTableBody;