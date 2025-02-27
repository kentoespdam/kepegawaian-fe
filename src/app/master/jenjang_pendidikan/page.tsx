import ButtonAddBuilder from "@components/builder/button/add";
import JenjangPendidikanTable from "@components/master/jenjang_pendidikan/table";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export const metadata = {
    title: "Master Jenjang Pendidikan",
};

const JenjangPendidikanPage = () => {
    return (
        <Card className="max-w-full">
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/jenjang_pendidikan/add"
                        msg="Tambah Jenjang Pendidikan" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <JenjangPendidikanTable />
            </CardContent>
        </Card>
    );
}

export default JenjangPendidikanPage;