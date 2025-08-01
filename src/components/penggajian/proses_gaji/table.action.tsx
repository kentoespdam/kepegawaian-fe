"use client";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import type { VerifikasiSchema } from "@_types/penggajian/verifikasi";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root";
import { useGlobalMutation } from "@store/query-store";
import { DeleteIcon, EllipsisIcon, RefreshCcwIcon } from "lucide-react";
import { verifikasiProses } from "./action";

interface ProsesGajiTableActionProps {
    row: GajiBatchRoot,
    pegawai: Pegawai,
    qKey: string[]
}
const ProsesGajiTableAction = ({ row, pegawai, qKey }: ProsesGajiTableActionProps) => {
    const { setBatchId, setOpenDelete } = useGajiBatchRootStore((state) => ({
        setBatchId: state.setBatchId,
        setOpenDelete: state.setOpenDelete,
    }));

    const reprocess = useGlobalMutation({
        mutationFunction: verifikasiProses,
        queryKeys: [qKey],
    });

    const prosesUlangHandler = async () => {
        if (!pegawai?.biodata?.nama || !pegawai?.jabatan?.nama) return;

        const x=confirm("Apakah anda yakin ingin memproses ulang gaji ini?")
        if(!x) return

        const formData: VerifikasiSchema = {
            id: row.id,
            nama: pegawai.biodata.nama,
            jabatan: pegawai.jabatan.nama,
            phase: "reprocess"
        }
        reprocess.mutate(formData)
    }

    const deleteHandler = () => {
        setBatchId(row.id);
        setOpenDelete(true);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="h-6 w-6">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-primary"
                        onClick={prosesUlangHandler}
                    >
                        <RefreshCcwIcon className="mr-2 h-[1rem] w-[1rem]" />
                        <span>Proses ulang</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-destructive"
                        onClick={deleteHandler}
                    >
                        <DeleteIcon className="mr-2 h-[1rem] w-[1rem]" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProsesGajiTableAction;
