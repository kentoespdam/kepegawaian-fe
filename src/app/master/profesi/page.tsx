import { profesiTableColumns } from "@_types/master/profesi";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import ProfesiTable from "./table";

export const metadata = {
    title: "Master Profesi",
};

const ProfesiPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/profesi/add"
                        msg="Tambah Profesi" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={profesiTableColumns} />
                <ProfesiTable />
            </CardContent>
        </Card>
    );
}

export default ProfesiPage;