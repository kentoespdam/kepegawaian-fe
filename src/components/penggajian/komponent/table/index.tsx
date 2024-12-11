"use client"

import { komponentGajiColumns, type KomponenGaji } from "@_types/penggajian/komponen";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useKomponenGajiStore } from "@store/penggajian/komponen";
import { useQuery } from "@tanstack/react-query";
import KomponenGajiTableBody from "./body";

interface KomponenGajiTableProps {
    profilId: number
}
const KomponenGajiTable = ({ profilId }: KomponenGajiTableProps) => {
    const { komponenGajiId, openDelete, setOpenDelete } = useKomponenGajiStore(state => state)
    const { data, isFetching, isLoading, isError, error } = useQuery({
        queryKey: ['komponen_gaji', profilId],
        queryFn: async () => getPageData<KomponenGaji>({
            path: `penggajian/komponen/${profilId}/profil`,
            isRoot: true
        }),
        enabled: profilId > 0
    })

    return (
        <div className="w-full min-h-4 scroll-auto">
            <Table>
                <TableHeadBuilder columns={komponentGajiColumns} />
                {isFetching || isLoading || isError || !data ?
                    <LoadingTable
                        columns={komponentGajiColumns}
                        isFetching={isFetching}
                        isLoading={isLoading}
                        error={error?.message}
                    /> : <KomponenGajiTableBody data={data} />}
            </Table>
            <DeleteZodDialogBuilder
                id={komponenGajiId}
                deletePath="penggajian/komponen"
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                queryKeys={["komponen_gaji", profilId]}
            />
        </div>
    );
}

export default KomponenGajiTable;