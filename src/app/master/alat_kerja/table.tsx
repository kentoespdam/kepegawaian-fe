"use client"

import { alatKerjaTableColumns, type AlatKerja } from "@_types/master/alat_kerja";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import AlatKerjaTableBody from "./body";

const AlatKerjaTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["alat_kerja", search.toString()],
        queryFn: () => getPageData<AlatKerja>({
            path: "alat_kerja",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md">
            <Table>
                <TableHeadBuilder columns={alatKerjaTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <AlatKerjaTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={alatKerjaTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default AlatKerjaTable;