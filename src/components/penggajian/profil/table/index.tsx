"use client"
import { profilGajiColumns, type ProfilGaji } from "@_types/penggajian/profil";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import ProfilGajiTableBody from "./body";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import { useProfilGajiStore } from "@store/penggajian/profil";
import ProfilGajiFormComponent from "../form";

const ProfilGajiTable = () => {
    const { profilGajiId, openDelete, setOpenDelete } = useProfilGajiStore(state => ({
        profilGajiId: state.profilGajiId,
        openDelete: state.openDelete,
        setOpenDelete: state.setOpenDelete
    }))
    
    const { data, isFetching, isLoading, isError, error } = useQuery({
        queryKey: ['profil_gaji'],
        queryFn: async () => getPageData<ProfilGaji>({
            path: "penggajian/profil",
            isRoot: true
        })
    })
    return (
        <div className="w-full min-h-4 scroll-auto">
            <Table >
                <TableHeadBuilder columns={profilGajiColumns} />
                {isFetching || isLoading || isError || !data ?
                    <LoadingTable
                        columns={profilGajiColumns}
                        isFetching={isFetching}
                        isLoading={isLoading}
                        error={error?.message}
                    /> : <ProfilGajiTableBody data={data} />}
            </Table>
            <DeleteZodDialogBuilder
                id={profilGajiId}
                deletePath="penggajian/profil"
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                queryKeys={["profil_gaji"]}
            />
            <ProfilGajiFormComponent />
        </div>
    );
}

export default ProfilGajiTable;