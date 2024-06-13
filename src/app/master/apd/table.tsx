"use client"

import { type Apd, apdTableColumns } from "@_types/master/apd";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageMasterData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ApdTableBody from "./body";

const ApdTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isFetching, isLoading, isSuccess, error } = useQuery({
        queryKey: ["apd", search.toString()],
        queryFn: () => getPageMasterData<Apd>({
            path: "apd",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md">
            <Table>
                <TableHeadBuilder columns={apdTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <ApdTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={apdTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default ApdTable;