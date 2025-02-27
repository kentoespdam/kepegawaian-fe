import { gradeTableColumns } from "@_types/master/grade";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import GradeTable from "../../../components/master/grade/table";

export const metadata = {
    title: "Master Grade",
};

const GradePage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/grade/add"
                        msg="Tambah Grade" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={gradeTableColumns} />
                <GradeTable />
            </CardContent>
        </Card>
    );
}

export default GradePage;