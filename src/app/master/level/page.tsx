import { levelTableColumns } from "@_types/master/level";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import LevelTable from "./table";

export const metadata = {
    title: "Master Level",
};

const LevelPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/level/add"
                        msg="Tambah Level" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={levelTableColumns} />
                <LevelTable />
            </CardContent>
        </Card>
    );
}

export default LevelPage;