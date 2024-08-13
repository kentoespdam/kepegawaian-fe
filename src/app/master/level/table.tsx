"use client"

import TableHeadBuilder from "@components/builder/table/head";
import { Table } from "@components/ui/table";
import LevelTableBody from "./body";
import PaginationBuilder from "@components/builder/table/pagination";
import { type Level, levelTableColumns } from "@_types/master/level";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@helpers/action";
import LoadingTable from "@components/builder/table/loading";

const LevelTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["level", search.toString()],
        queryFn: () => getPageData<Level>({ path: "level", searchParams: search.toString() }),
    });

    return (
        <>
            <Table>
                <TableHeadBuilder columns={levelTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <LevelTableBody data={data} /> :
                    <LoadingTable isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={levelTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </>
    );
}

export default LevelTable;