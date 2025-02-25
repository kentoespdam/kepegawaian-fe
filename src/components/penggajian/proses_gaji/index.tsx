"use client";

import { gajiBatchRootColumns, type GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import GajiBatchRootTableBody from "./table.body";
import type { Pegawai } from "@_types/pegawai";
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root";
import DeleteBatchRootDialog from "./action.delete.dialog";

interface ProsesGajiComponentProps {
    pegawai: Pegawai
}
const ProsesGajiComponent = ({ pegawai }: ProsesGajiComponentProps) => {
    const { batchId, openDelete, setOpenDelete } = useGajiBatchRootStore(state => ({
        batchId: state.batchId,
        openDelete: state.openDelete,
        setOpenDelete: state.setOpenDelete
    }))
    const params = useSearchParams()
    const search = new URLSearchParams(params)

    const qkey = ["gaji_batch_root", search.toString()]

    const { isLoading, error, data } = useQuery({
        queryKey: qkey,
        queryFn: async () => await getPageData<GajiBatchRoot>({
            path: "penggajian/batch",
            searchParams: search.toString(),
            isRoot: true
        })
    })


    return (
        <>
            <SearchBuilder columns={gajiBatchRootColumns} qkey={qkey} />
            <div className="w-full overflow-auto min-h-90">
                <Table>
                    <TableHeadBuilder columns={gajiBatchRootColumns} />
                    {isLoading || error || !data || data?.empty ? (
                        <LoadingTable
                            columns={gajiBatchRootColumns}
                            isLoading={isLoading}
                            error={error?.message}
                        />
                    ) : (
                        <GajiBatchRootTableBody data={data} pegawai={pegawai} qkey={qkey} />
                    )}
                </Table>
                <PaginationBuilder data={data} />
            </div>
            <DeleteBatchRootDialog
                id={batchId}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                queryKeys={qkey}
            />
        </>
    );
}

export default ProsesGajiComponent;