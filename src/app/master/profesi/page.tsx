import ButtonAddBuilder from "@components/builder/button/add";
import ProfesiTable from "@components/master/profesi";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

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
                <ProfesiTable />
            </CardContent>
        </Card>
    );
}

export default ProfesiPage;