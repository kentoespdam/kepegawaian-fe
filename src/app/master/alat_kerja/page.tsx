import { alatKerjaTableColumns } from "@_types/master/alat_kerja";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import AlatKerjaTable from "./table";

export const metadata = {
    title: "Master Alat Kerja",
};

const AlatKerjaPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/alat_kerja/add"
                        msg="Tambah Alat Kerja" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={alatKerjaTableColumns} />
                <AlatKerjaTable />
            </CardContent>
        </Card>
    );
}

export default AlatKerjaPage;