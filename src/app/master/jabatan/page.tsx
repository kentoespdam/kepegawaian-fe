import { jabatanTableColumns } from "@_types/master/jabatan";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import JabatanTable from "../../../components/master/jabatan/table";

export const metadata = {
    title: "Master Jabatan",
};

const JabatanPage = () => {
    return (
        <div className="grid">
            <Card>
                <CardHeader>
                    <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                        <span>{metadata.title}</span>
                        <ButtonAddBuilder
                            href="/master/jabatan/add"
                            msg="Tambah Jabatan" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <SearchBuilder columns={jabatanTableColumns} />
                    <JabatanTable />
                </CardContent>
            </Card>
        </div>
    );
}

export default JabatanPage;