import { statusKerjaTableColumns } from "@_types/master/status_kerja";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import StatusKerjaTable from "./table";

export const metadata = {
    title: "Master Status Kerja",
};

const StatusKerjaPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/status_kerja/add"
                        msg="Tambah Status Kerja" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={statusKerjaTableColumns} />
                <StatusKerjaTable />
            </CardContent>
        </Card>
    );
}

export default StatusKerjaPage;