import { levelTableColumns } from "@_types/master/level";
import SearchBuilder from "@components/builder/search";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import LevelTable from "./table";

export const metadata = {
    title: "Master Level",
};

const LevelPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>Master Level</span>
                    <TooltipBuilder text="Add Level" className="bg-primary">
                        <Link href="/master/level/add">
                            <Button
                                variant="ghost"
                                className="p-0 w-6 h-6 rounded-full text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <CirclePlusIcon />
                            </Button>
                        </Link>
                    </TooltipBuilder>
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