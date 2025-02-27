"use client"
import { type GajiBatchMasterProses, gajiBatchMasterProsesColumns } from "@_types/gaji_batch_master_process";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Label } from "@components/ui/label";
import { Table } from "@components/ui/table";
import { globalGetData } from "@helpers/action";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";
import { useQuery } from "@tanstack/react-query";
import { ReceiptTextIcon } from "lucide-react";
import GajiBatchMasterProsesTableBody from "./table.body";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { JENIS_GAJI, JenisGaji } from "@_types/enums/jenis_gaji";

const GajiBatchMasterProcessTable = () => {
    const { batchMasterId } = useGajiBatchMasterProsesStore(state => ({
        batchMasterId: state.batchMasterId
    }))

    const qkey = ["gaji_batch_master_proses", batchMasterId]

    const { isLoading, isFetching, isError, data, error } = useQuery({
        queryKey: qkey,
        queryFn: async () => await globalGetData<GajiBatchMasterProses[]>({
            path: `penggajian/batch/master/proses/${batchMasterId}/master`,
            isRoot: true
        }),
        enabled: !!batchMasterId
    })

    return (
        <div className="grid gap-2">
            <div>
                <h2 className="flex">
                    <ReceiptTextIcon className="w-4 h-4 mr-1" /> Rincian Gaji
                </h2>
            </div>
            <h3>Jenis: Penghasilan</h3>
            <div className="w-full min-h-[350px] overflow-auto">
                <Table>
                    <TableHeadBuilder columns={gajiBatchMasterProsesColumns} />
                    {isLoading || isFetching || isError || !data ?
                        <LoadingTable columns={gajiBatchMasterProsesColumns} error={error?.message} />
                        : <GajiBatchMasterProsesTableBody data={data} jenisGaji={JENIS_GAJI.PEMASUKAN} />}
                </Table>
            </div>
            <h3>Jenis: Potongan</h3>
            <div className="w-full min-h-[350px] overflow-auto">
                <Table>
                    <TableHeadBuilder columns={gajiBatchMasterProsesColumns} />
                    {isLoading || isFetching || isError || !data ?
                        <LoadingTable columns={gajiBatchMasterProsesColumns} error={error?.message} />
                        : <GajiBatchMasterProsesTableBody data={data} jenisGaji={JENIS_GAJI.POTONGAN} />}
                </Table>
            </div>
        </div>
    );
}

export default GajiBatchMasterProcessTable;