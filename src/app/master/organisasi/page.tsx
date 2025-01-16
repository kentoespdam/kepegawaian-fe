import { organisasiTableColumns } from "@_types/master/organisasi";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import OrganisasiTable from "../../../components/master/organisasi/table";

export const metadata = {
    title: "Master Organisasi",
};

const OrganisasiPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/organisasi/add"
                        msg="Tambah Organisasi" />
                </CardTitle>
            </CardHeader>
            <CardContent className="grid col-span-2">
                <SearchBuilder columns={organisasiTableColumns} />
                <OrganisasiTable />
            </CardContent>
        </Card>
    );
}

export default OrganisasiPage;