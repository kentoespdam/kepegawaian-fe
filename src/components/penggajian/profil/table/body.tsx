import type { Pageable } from "@_types/index";
import type { ProfilGaji } from "@_types/penggajian/profil";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { cn } from "@lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import ProfilGajiTableAction from "../button/table-action";
import { Button } from "@components/ui/button";
import { EyeIcon } from "lucide-react";

interface ProfilGajiTableBodyProps {
    data: Pageable<ProfilGaji>
}
const ProfilGajiTableBody = ({ data }: ProfilGajiTableBodyProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const profilId = +(params.get("profilId") ?? "0")

    const handleRowClick = (row: ProfilGaji) => {
        const url = "/penggajian/komponen_gaji";
        const params = new URLSearchParams({ profilId: String(row.id) });
        if (profilId === row.id) {
            router.replace(url);
        } else {
            router.replace(`${url}?${params.toString()}`);
        }
    };

    let urut = getUrut(data)
    return (
        <TableBody>
            {data.content.map((row) => (
                <TableRow
                    className={cn("odd:bg-muted hover:bg-green-200", {
                        "bg-green-300 odd:bg-green-300": profilId === row.id,
                    })}
                    key={row.id}
                >
                    <TableCell className="border" align="right">{urut++}</TableCell>
                    <TableCell className="border">{row.nama}</TableCell>
                    <TableCell className="border">
                        <div className="flex justify-between items-center gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-cyan-400 hover:bg-transparent hover:text-cyan-700"
                                onClick={() => handleRowClick(row)}
                            >
                                <EyeIcon />
                            </Button>
                            <ProfilGajiTableAction row={row} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ProfilGajiTableBody;