import type { Pageable } from "@_types/index";
import { type Biodata, biodataTableColumns } from "@_types/profil/biodata";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Table } from "@components/ui/table";
import { TabsContent } from "@components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import NonPegawaiTableBody from "./body";

const TabBiodataNonPegawai = () => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const qc = useQueryClient()
    const qs = qc.getQueryState<Pageable<Biodata>>(["data-biodata", params.toString()])

    return (
        <TabsContent value="non-pegawai" x-chunk="dashboard-05-chunk-3">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Daftar Biodata</CardTitle>
                    <CardDescription>
                        Daftar Biodata Non Pegawai
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid">
                    <SearchBuilder columns={biodataTableColumns} />
                    <Table>
                        <TableHeadBuilder columns={biodataTableColumns} />
                        {qs?.status === "pending" ?
                            <LoadingTable columns={biodataTableColumns} isLoading={true} /> :
                            !qs?.data || qs?.status === "error" ?
                                <LoadingTable columns={biodataTableColumns} isSuccess={false} error={qs?.error?.message} /> :
                                <NonPegawaiTableBody data={qs.data} />
                        }
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default TabBiodataNonPegawai;