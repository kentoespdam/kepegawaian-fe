import { jabatanTableColumns } from "@_types/master/jabatan";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import JabatanTable from "./table";

export const metadata = {
    title: "Master Jabatan",
};

const JabatanPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/jabatan/add"
                        msg="Tambah Jabatan" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={jabatanTableColumns} />
                <JabatanTable />
            </CardContent>
        </Card>
    );
}

export default JabatanPage;