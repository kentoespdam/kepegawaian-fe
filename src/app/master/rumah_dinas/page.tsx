import TooltipBuilder from "@components/builder/tooltip";
import RumahDinasComponent from "@components/master/rumah_dinas";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
    title: "Rumah Dinas"
}
const RumahDinasPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <TooltipBuilder text="Add Rumah Dinas">
                        <ButtonLink
                            href="/master/rumah_dinas/add"
                            icon={<PlusCircleIcon className="size-5" />}
                            variant={"ghost"}
                            className="text-primary hover:opacity-75"
                            size={"icon"} />
                    </TooltipBuilder>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <RumahDinasComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default RumahDinasPage;