import type { Pageable } from "@_types/index";
import { statusPegawaiTableColumns, type StatusPegawai } from "@_types/master/status_pegawai";
import ButtonDeleteBuilder from "@components/builder/button/delete";
import ButtonEditBuilder from "@components/builder/button/edit";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { hapus } from "./action";

type StatusPegawaiTableBodyProps = {
    data: Pageable<StatusPegawai>;
};
const StatusPegawaiTableBody = ({ data }: StatusPegawaiTableBodyProps) => {
    let urut = getUrut(data)

    return (
        <TableBody>
            {data.empty ? (
                <TableRow>
                    <TableCell
                        colSpan={statusPegawaiTableColumns.length}
                        className="text-center"
                    >
                        Data Not Found!
                    </TableCell>
                </TableRow>
            ) : (
                data.content.map((statusPegawai) => (
                    <TableRow key={statusPegawai.id}>
                        <TableCell width={60} align="right" className="border-x">{urut++}</TableCell>
                        <TableCell className="border-x">{statusPegawai.nama}</TableCell>
                        <TableCell align="center" className="border-x">
                            <ButtonDeleteBuilder
                                id={statusPegawai.id}
                                msg="Delete Status Pegawai"
                                action={hapus}
                                tag="status_pegawai"
                            />
                            <ButtonEditBuilder
                                href={`/master/status_pegawai/edit/${statusPegawai.id}`}
                                msg="Edit Status Pegawai"
                            />
                        </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    );
};

export default StatusPegawaiTableBody;