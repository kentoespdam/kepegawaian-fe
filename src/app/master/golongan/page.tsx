import { golonganTableColumns } from "@_types/master/golongan";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import GolonganTable from "../../../components/master/golongan/table";

export const metadata = {
    title: "Master Golongan",
};

const GolonganPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/golongan/add"
                        msg="Tambah Golongan" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={golonganTableColumns} />
                <GolonganTable />
            </CardContent>
        </Card>
    );
}

export default GolonganPage;