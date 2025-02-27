"use client"
import { STATUS_PROSES_GAJI, getKeyStatusProsesGaji } from "@_types/enums/status_proses_gaji";
import type { Organisasi } from "@_types/master/organisasi";
import type { Pegawai } from "@_types/pegawai";
import { gajiBatchMasterColumns, type GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import { globalGetData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { FileSpreadsheetIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GajiBatchMasterTableBody from "../gaji_batch_master/table.body";


interface VerifPhase1ComponentProps {
    pegawai: Pegawai,
    organisasiList: Organisasi[]
}
const VerifPhase1Component = ({ pegawai, organisasiList }: VerifPhase1ComponentProps) => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams)
    search.set("status", getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_1))
    const periode = searchParams.get("periode")
    const qkey = ["verifPhase1", search.toString()]

    const { data } = useQuery({
        queryKey: qkey,
        queryFn: async () => await globalGetData<GajiBatchMaster[]>({
            path: "penggajian/batch/master",
            searchParams: search.toString(),
            isRoot: true
        }),
        enabled: !!periode
    })

    return (
        <div className="grid gap-2 pr-4" >
            <div>
                <h2 className="flex">
                    <FileSpreadsheetIcon className="w-5 h-5 mr-1" /> Daftar Gaji
                </h2>
            </div>
            <SearchBuilder columns={gajiBatchMasterColumns} />
            <div className="block max-h-[70vh] min-h-[350px] overflow-y-auto">
                <table className="w-full">
                    <TableHeadBuilder columns={gajiBatchMasterColumns} />
                    <GajiBatchMasterTableBody
                        pegawai={pegawai}
                        organisasiList={organisasiList}
                        gajiBatchMasters={data} />
                </table>
            </div>
        </div >
    );
}

export default VerifPhase1Component;