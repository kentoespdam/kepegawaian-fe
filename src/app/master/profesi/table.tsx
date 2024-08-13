"use client"

import { type Profesi, profesiTableColumns } from "@_types/master/profesi";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ProfesiTableBody from "./body";

const ProfesiTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["profesi", search.toString()],
        queryFn: () => getPageData<Profesi>({
            path: "profesi",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md">
            <Table>
                <TableHeadBuilder columns={profesiTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <ProfesiTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={profesiTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default ProfesiTable;