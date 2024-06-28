"use client"

import { type JenisPelatihan, jenisPelatihanTableColumns } from "@_types/master/jenis_pelatihan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JenisPelatihanTableBody from "./body";

const JenisPelatihanTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { data, isFetching, isLoading, isSuccess, error } = useQuery({
        queryKey: ["jenis_pelatihan", search.toString()],
        queryFn: () => getPageData<JenisPelatihan>({
            path: "jenis_pelatihan",
            searchParams: search.toString()
        }),
    });
    return (
        <div className="max-w-full">
            <SearchBuilder
                columns={jenisPelatihanTableColumns}
                pending={isFetching || isLoading}
            />

            <Table>
                <TableHeadBuilder columns={jenisPelatihanTableColumns} />
                {isSuccess && data.content.length > 0 ?
                    <JenisPelatihanTableBody data={data} /> :
                    <LoadingTable
                        isFetching={isFetching}
                        isLoading={isLoading}
                        error={error?.message}
                        isSuccess={isSuccess}
                        isEmpty={data?.content.length === 0}
                        columns={jenisPelatihanTableColumns} />
                }
            </Table>
            <PaginationBuilder data={data} />
        </div>
    );
}

export default JenisPelatihanTable;