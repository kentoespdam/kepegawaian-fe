"use client"

import { jabatanTableColumns, type Jabatan } from "@_types/master/jabatan";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JabatanTableBody from "./body";

const JabatanTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["jabatan", search.toString()],
        queryFn: () => getPageData<Jabatan>({
            path: "jabatan",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md grid">
            <Table>
                <TableHeadBuilder columns={jabatanTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <JabatanTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={jabatanTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default JabatanTable;