import { jenisKeahlianTableColumns } from "@_types/master/jenis_keahlian";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import JenisKeahlianTable from "@components/master/jenis_keahlian/table";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export const metadata = {
    title: "Master Jenis Keahlian",
};

const JenisKeahlianPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/jenis_keahlian/add"
                        msg="Tambah JenisKeahlian" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={jenisKeahlianTableColumns} />
                <JenisKeahlianTable />
            </CardContent>
        </Card>
    );
}

export default JenisKeahlianPage;