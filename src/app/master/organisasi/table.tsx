"use client"

import { type Organisasi, organisasiTableColumns } from "@_types/master/organisasi";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageMasterData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import OrganisasiTableBody from "./body";

const OrganisasiTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["organisasi", search.toString()],
        queryFn: () => getPageMasterData<Organisasi>({
            path: "organisasi",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md border">
            <Table>
                <TableHeadBuilder columns={organisasiTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <OrganisasiTableBody data={data} /> :
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={organisasiTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default OrganisasiTable;