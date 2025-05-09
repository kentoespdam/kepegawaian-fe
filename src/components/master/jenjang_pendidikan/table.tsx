"use client"

import { jenjangPendidikanTableColumns, type JenjangPendidikan } from "@_types/master/jenjang_pendidikan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JenjangPendidikanTableBody from "./table.body";

const JenjangPendidikanTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isFetching, isLoading, isSuccess, error } = useQuery({
        queryKey: ["jenjang_pendidikan", search.toString()],
        queryFn: () => getPageData<JenjangPendidikan>({
            path: "jenjang_pendidikan",
            searchParams: search.toString()
        }),
    });
    return (
        <div className="max-w-full">
            <SearchBuilder
                columns={jenjangPendidikanTableColumns}
                pending={isFetching || isLoading}
            />

            <Table>
                <TableHeadBuilder columns={jenjangPendidikanTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <JenjangPendidikanTableBody data={data} /> :
                    <LoadingTable
                        isFetching={isFetching}
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={jenjangPendidikanTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default JenjangPendidikanTable;