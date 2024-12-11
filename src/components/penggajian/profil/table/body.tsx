import type { Pageable } from "@_types/index";
import type { ProfilGaji } from "@_types/penggajian/profil";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import ProfilGajiTableAction from "../button/table-action";

interface ProfilGajiTableBodyProps {
    data: Pageable<ProfilGaji>
}
const ProfilGajiTableBody = ({ data }: ProfilGajiTableBodyProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const profilId = +(params.get("profilId") ?? "0")

    const onSelectRow = (row: ProfilGaji) => {
        console.log("clicked", profilId === row.id)
        const url = "/penggajian/komponen_gaji"
        if (profilId > 0 && profilId === row.id) {
            router.replace(url)
        } else {
            router.replace(`${url}?profilId=${row.id}`)
        }
    };

    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow
                    className={cn("cursor-pointer odd:bg-muted hover:bg-green-200", {
                        "bg-green-300 odd:bg-green-300": profilId === row.id,
                    })}
                    key={row.id}
                    onClick={() => onSelectRow(row)}
                >
                    <TableCell className="border" align="right">{urut++}</TableCell>
                    <TableCell className="border">{row.nama}</TableCell>
                    <TableCell className="border">
                        <ProfilGajiTableAction row={row} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ProfilGajiTableBody;