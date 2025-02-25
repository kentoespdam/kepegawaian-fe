"use client";
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageData } from "@helpers/action"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import PhdpTableBody from "./table/body";
import { usePhdpStore } from "@store/penggajian/phdp";
import { type Phdp, phdpTableColumns } from "@_types/penggajian/phdp";

const PhdpComponent = () => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const { phdpId, openDelete, setOpenDelete } = usePhdpStore((state) => state)

    const { isLoading, error, data } = useQuery({
        queryKey: ['phdp', search.toString()],
        queryFn: async () => await getPageData<Phdp>({
            path: "penggajian/phdp",
            searchParams: search.toString(),
            isRoot: true
        }),
    })

    return (
        <>
            <SearchBuilder columns={phdpTableColumns} />
            <div className="overflow-auto min-h-90">
                <Table>
                    <TableHeadBuilder columns={phdpTableColumns} />
                    {isLoading || error || !data || data?.empty ? (
                        <LoadingTable
                            columns={phdpTableColumns}
                            isLoading={isLoading}
                            error={error?.message}
                        />
                    ) : (
                        <PhdpTableBody data={data} />
                    )}
                </Table>
                <PaginationBuilder data={data} />
                <DeleteZodDialogBuilder
                    id={phdpId}
                    deletePath="penggajian/phdp"
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    queryKeys={["phdp", search.toString()]}
                />

            </div>
        </>
    );
}

export default PhdpComponent;
