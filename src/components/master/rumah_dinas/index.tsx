"use client";

import { rumahDinasTableColumns, type RumahDinas } from "@_types/master/rumah_dinas";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useRumahDinasStore } from "@store/master/rumah_dinas";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RumahDinasTableBody from "./table/body";

const RumahDinasComponent = () => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const { rumahDinasId, openDelete, setOpenDelete } = useRumahDinasStore((state) => ({
        rumahDinasId: state.rumahDinasId,
        openDelete: state.openDelete,
        setOpenDelete: state.setOpenDelete
    }))

    const { isLoading, error, data } = useQuery({
        queryKey: ['rumah_dinas', search.toString()],
        queryFn: async () => await getPageData<RumahDinas>({
            path: "rumah_dinas",
            searchParams: search.toString()
        })
    })

    return (
        <>
            <SearchBuilder columns={rumahDinasTableColumns} />
            <div className="overflow-auto min-h-90">
                <Table>
                    <TableHeadBuilder columns={rumahDinasTableColumns} />
                    {isLoading || error || !data || data?.empty ? (
                        <LoadingTable
                            columns={rumahDinasTableColumns}
                            isLoading={isLoading}
                            error={error?.message || "No Data"}
                        />
                    ) : (
                        <RumahDinasTableBody data={data} />
                    )}
                </Table>
                <PaginationBuilder data={data} />
                <DeleteZodDialogBuilder
                    id={rumahDinasId}
                    deletePath="master/rumah-dinas"
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    queryKeys={["rumah_dinas", search.toString()]}
                />
            </div>
        </>
    );
}

export default RumahDinasComponent;