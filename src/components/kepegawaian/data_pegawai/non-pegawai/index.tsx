import { biodataTableColumns } from "@_types/profil/biodata";
import TableHeadBuilder from "@components/builder/table/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Table } from "@components/ui/table";
import { TabsContent } from "@components/ui/tabs";

const TabBiodataNonPegawai = () => {
    return (
        <TabsContent value="non-pegawai" x-chunk="dashboard-05-chunk-3">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Daftar Biodata</CardTitle>
                    <CardDescription>
                        Daftar Biodata Non Pegawai
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeadBuilder columns={biodataTableColumns} />
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default TabBiodataNonPegawai;