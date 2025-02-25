"use client";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchRoot, GajiBatchRootProsesUlang } from "@_types/penggajian/gaji_batch_root";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root";
import { useGlobalMutation } from "@store/query-store";
import { DeleteIcon, EllipsisIcon, RefreshCcwIcon } from "lucide-react";
import { prosesUlang } from "./action";
import { BaseDelete } from "@_types/index";

interface ProsesGajiTableActionProps {
    row: GajiBatchRoot,
    pegawai: Pegawai,
    qkey: string[]
}
const ProsesGajiTableAction = ({ row, pegawai, qkey }: ProsesGajiTableActionProps) => {
    const { setBatchId, setOpenDelete } = useGajiBatchRootStore((state) => ({
        setBatchId: state.setBatchId,
        setOpenDelete: state.setOpenDelete,
    }));

    const reprocess = useGlobalMutation({
        mutationFunction: prosesUlang,
        queryKeys: [qkey],
    });

    const prosesUlangHandler = async () => {
        if (!pegawai?.biodata?.nama || !pegawai?.jabatan?.nama) return;

        const formData: GajiBatchRootProsesUlang = { 
            batchId: row.batchId,
            nama: pegawai.biodata.nama,
            jabatan: pegawai.jabatan.nama
        }
        reprocess.mutate(formData)
    }

    const deleteHandler = () => { 
        setBatchId(row.batchId);
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
