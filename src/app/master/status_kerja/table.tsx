"use client"

import { type StatusKerja, statusKerjaTableColumns } from "@_types/master/status_kerja";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StatusKerjaTableBody from "./body";

const StatusKerjaTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ["status_kerja", search.toString()],
        queryFn: () => getPageData<StatusKerja>({
            path: "status_kerja",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md">
            <Table>
                <TableHeadBuilder columns={statusKerjaTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <StatusKerjaTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={statusKerjaTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default StatusKerjaTable;