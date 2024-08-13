import { apdTableColumns } from "@_types/master/apd";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import ApdTable from "./table";

export const metadata = {
    title: "Master Alat Pelindung Diri",
};

const ApdPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/apd/add"
                        msg="Tambah Alat Pelindung Diri" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={apdTableColumns} />
                <ApdTable />
            </CardContent>
        </Card>
    );
}

export default ApdPage;