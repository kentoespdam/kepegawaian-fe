"use client";

import { type RumahDinas, rumahDinasTableColumns } from "@_types/master/rumah_dinas";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RumahDinasTableBody from "./table/body";
import DeleteRumahDinasDialog from "./button/delete_rumah_dinas";

const RumahDinasComponent = () => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)

    const { isLoading, error, data } = useQuery({
        queryKey: ['rumah_dinas', search.toString()],
        queryFn: async () => await getPageData<RumahDinas>({
            path: "rumah-dinas",
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
                <DeleteRumahDinasDialog />
            </div>
        </>
    );
}

export default RumahDinasComponent;