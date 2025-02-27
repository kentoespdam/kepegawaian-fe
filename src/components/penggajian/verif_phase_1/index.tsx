"use client"
import type { Organisasi } from "@_types/master/organisasi";
import type { Pegawai } from "@_types/pegawai";
import { gajiBatchMasterColumns, type GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { FileSpreadsheetIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GajiBatchMasterTableBody from "../gaji_batch_master/table.body";
import { getNamaBulan } from "@helpers/tanggal";


interface VerifPhase1ComponentProps {
    pegawai: Pegawai,
    organisasiList: Organisasi[],
    gajiBatchMasters?: GajiBatchMaster[]
}
const VerifPhase1Component = ({ pegawai, organisasiList, gajiBatchMasters }: VerifPhase1ComponentProps) => {
    const searchParams = useSearchParams();
    const periode = searchParams.get("periode")
    const tahun = periode?.substring(0, 4)
    const bulan = periode?.substring(4, 6)

    return (
        <div className="grid gap-2 pr-4" >
            <div>
                <h2 className="flex">
                    <FileSpreadsheetIcon className="w-5 h-5 mr-1" />
                    Gaji [Periode <span className="ml-2 text-primary">{getNamaBulan(Number(bulan))} {tahun}</span>]
                </h2>
            </div>
            <SearchBuilder columns={gajiBatchMasterColumns} />
            <div className="block max-h-[70vh] min-h-[350px] overflow-y-auto">
                <table className="w-full">
                    <TableHeadBuilder columns={gajiBatchMasterColumns} />
                    {!gajiBatchMasters ? <LoadingTable columns={gajiBatchMasterColumns} isLoading={false} /> :
                        <GajiBatchMasterTableBody
                            pegawai={pegawai}
                            organisasiList={organisasiList}
                            gajiBatchMasters={gajiBatchMasters} />
                    }
                </table>
            </div>
        </div >
    );
}

export default VerifPhase1Component;