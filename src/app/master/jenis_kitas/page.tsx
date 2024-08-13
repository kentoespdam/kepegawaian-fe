import { jenisKitasTableColumns } from "@_types/master/jenis_kitas";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import JenisKitasTable from "./table";

export const metadata = {
    title: "Master Jenis Kartu Identitas",
};

const JenisKitasPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/jenis_kitas/add"
                        msg="Tambah Jenis Kartu Identitas" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={jenisKitasTableColumns} />
                <JenisKitasTable />
            </CardContent>
        </Card>
    );
}

export default JenisKitasPage;