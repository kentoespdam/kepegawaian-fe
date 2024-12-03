"use client"

import { profesiTableColumns, type Profesi } from "@_types/master/profesi";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useAlatKerjaStore } from "@store/master/alat_kerja";
import { useApdStore } from "@store/master/apd";
import { useProfesiStore } from "@store/master/profesi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ProfesiTableBody from "./table/body";

const ProfesiTable = () => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);

    const { profesiId, openDelete, setOpenDelete } = useProfesiStore((state) => state)
    const { apdId, openDelete: openDeleteApd, setOpenDelete: setOpenDeleteApd } = useApdStore((state) => state)
    const { alatKerjaId, openDelete: openDeleteAlatKerja, setOpenDelete: setOpenDeleteAlatKerja } = useAlatKerjaStore((state) => state)

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["profesi", search.toString()],
        queryFn: () => getPageData<Profesi>({
            path: "profesi",
            searchParams: search.toString()
        }),
    });

    return (
        <>
            <SearchBuilder columns={profesiTableColumns} />
            <div className="overflow-auto min-h-90">
                <Table>
                    <TableHeadBuilder columns={profesiTableColumns} />
                    {isSuccess && data.content.length > 0 ?
                        <ProfesiTableBody data={data} /> :
                        <LoadingTable
                            isLoading={isLoading}
                            error={error?.message || "No Data"}
                            isSuccess={isSuccess}
                            columns={profesiTableColumns} />
                    }
                </Table>
                <PaginationBuilder data={data} />
                <DeleteZodDialogBuilder
                    id={profesiId}
                    deletePath="master/profesi"
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    queryKeys={["profesi", search.toString()]}
                />
                <DeleteZodDialogBuilder
                    id={apdId}
                    deletePath="master/apd"
                    openDelete={openDeleteApd}
                    setOpenDelete={setOpenDeleteApd}
                    queryKeys={["profesi", search.toString()]}
                />
                <DeleteZodDialogBuilder
                    id={alatKerjaId}
                    deletePath="master/alat-kerja"
                    openDelete={openDeleteAlatKerja}
                    setOpenDelete={setOpenDeleteAlatKerja}
                    queryKeys={["profesi", search.toString()]}
                />
            </div>
        </>
    );
}

export default ProfesiTable;