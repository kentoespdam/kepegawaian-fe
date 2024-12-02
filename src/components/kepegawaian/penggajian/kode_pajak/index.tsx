"use client"
import { type PendapatanNonPajak, pendapatanNonPajakColumns } from "@_types/penggajian/pendapatan_non_pajak";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteKodePajakDialog from "./button/delete-kode-pajak";
import PendapatanNonPajakTableBody from "./table/body";

const KodePajakComponent = () => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)

    const { isLoading, error, data } = useQuery({
        queryKey: ['kode-pajak', search.toString()],
        queryFn: async () => await getPageData<PendapatanNonPajak>({
            path: "penggajian/pendapatan-non-pajak",
            searchParams: search.toString(),
            isRoot: true
        })
    })

    return (
        <>
            <SearchBuilder columns={pendapatanNonPajakColumns} />
            <div className="overflow-auto min-h-90">
                <Table>
                    <TableHeadBuilder columns={pendapatanNonPajakColumns} />
                    {isLoading || error || !data || data?.empty ? (
                        <LoadingTable
                            columns={pendapatanNonPajakColumns}
                            isLoading={isLoading}
                            error={error?.message}
                        />
                    ) : (
                        <PendapatanNonPajakTableBody data={data} />
                    )}
                </Table>
                <PaginationBuilder data={data} />
                <DeleteKodePajakDialog />
            </div>
        </>
    );
}

export default KodePajakComponent;