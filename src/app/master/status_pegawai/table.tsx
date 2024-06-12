"use client"
import { type StatusPegawai, statusPegawaiTableColumns } from "@_types/master/status_pegawai";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageMasterData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StatusPegawaiTableBody from "./body";

const StatusPegawaiTable = () => {
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)
    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["status_pegawai", search.toString()],
        queryFn: () => getPageMasterData<StatusPegawai>({ path: "status-pegawai", searchParams: search.toString() })
    })
    return (
        <>
            <Table>
                <TableHeadBuilder columns={statusPegawaiTableColumns} />
                {!isSuccess ?
                    <LoadingTable columns={statusPegawaiTableColumns} isLoading={isLoading} error={error?.message} /> :
                    <StatusPegawaiTableBody data={data} />
                }

            </Table>
            <PaginationBuilder data={data} />
        </>
    );
}

export default StatusPegawaiTable;