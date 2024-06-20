import { pegawaiTableColumns } from "@_types/pegawai";
import TableHeadBuilder from "@components/builder/table/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Table } from "@components/ui/table";
import { TabsContent } from "@components/ui/tabs";

const TabBiodataPegawai = () => {
    return (
        <TabsContent value="pegawai">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Daftar Pegawai</CardTitle>
                    <CardDescription>
                        Daftar Biodata Pegawai
                    </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeadBuilder columns={pegawaiTableColumns} />
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default TabBiodataPegawai;