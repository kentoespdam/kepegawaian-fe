"use client"

import { type Golongan, golonganTableColumns } from "@_types/master/golongan";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageMasterData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import GolonganTableBody from "./body";

const GolonganTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["golongan", search.toString()],
        queryFn: () => getPageMasterData<Golongan>({
            path: "golongan",
            searchParams: search.toString()
        }),
    });

    return (
        <div className="rounder-md border">
            <Table>
                <TableHeadBuilder columns={golonganTableColumns} />
                {!isSuccess ?
                    <LoadingTable
                        isLoading={isLoading}
                        error={error?.message}
                        columns={golonganTableColumns} /> :
                    <GolonganTableBody data={data} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default GolonganTable;