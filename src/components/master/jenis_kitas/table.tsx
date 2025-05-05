"use client"

import { jenisKitasTableColumns, type JenisKitas } from "@_types/master/jenis_kitas";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JenisKitasTableBody from "./table.body";

const JenisKitasTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isFetching, isLoading, isSuccess, error } = useQuery({
        queryKey: ["jenis_kitas", search.toString()],
        queryFn: () => getPageData<JenisKitas>({
            path: "jenis_kitas",
            searchParams: search.toString()
        }),
    });

    return (
        <>
            <Table>
                <TableHeadBuilder columns={jenisKitasTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <JenisKitasTableBody data={data} /> :
                    <LoadingTable
                        isFetching={isFetching}
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        
                        columns={jenisKitasTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </>
    );
}

export default JenisKitasTable;