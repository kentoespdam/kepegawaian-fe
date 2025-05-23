import ButtonAddBuilder from "@components/builder/button/add";
import JenisPelatihanTable from "@components/master/jenis_pelatihan/table";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export const metadata = {
    title: "Master Jenis Pelatihan",
};

const JenisPelatihanPage = () => {
    return (
        <Card className="max-w-full">
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/jenis_pelatihan/add"
                        msg="Tambah Jenis Pelatihan" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <JenisPelatihanTable />
            </CardContent>
        </Card>
    );
}

export default JenisPelatihanPage;