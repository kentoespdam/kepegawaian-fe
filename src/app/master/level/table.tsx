"use client"

import TableHeadBuilder from "@components/builder/table/head";
import { Table } from "@components/ui/table";
import LevelTableBody from "./body";
import PaginationBuilder from "@components/builder/table/pagination";
import { type Level, levelTableColumns } from "@_types/master/level";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPageMasterData } from "@helpers/action";
import LoadingTable from "@components/builder/table/loading";

const LevelTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["level", search.toString()],
        queryFn: () => getPageMasterData<Level>({ path: "level", searchParams: search.toString() }),
    });

    return (
        <div className="rounder-md border">
            <Table>
                <TableHeadBuilder columns={levelTableColumns} />
                {!isSuccess ?
                    <LoadingTable isLoading={isLoading} error={error?.message} columns={levelTableColumns} /> :
                    <LevelTableBody data={data} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default LevelTable;