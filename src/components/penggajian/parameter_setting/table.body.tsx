import type { Pageable } from "@_types/index";
import type { ParameterSetting } from "@_types/penggajian/parameter_setting";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import ParameterSettingTableActionButton from "./button.table.action";

interface ParameterSettingTableBodyProps {
    data: Pageable<ParameterSetting>
}
const ParameterSettingTableBody = ({ data }: ParameterSettingTableBodyProps) => {
    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right" width={40} className="border-x">{urut++}</TableCell>
                    <TableCell className="border-x" width={60} align="center">
                        <ParameterSettingTableActionButton parameterSettingId={row.id} />
                    </TableCell>
                    <TableCell className="border-x">{row.kode}</TableCell>
                    <TableCell className="border-x">{row.nominal}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ParameterSettingTableBody;