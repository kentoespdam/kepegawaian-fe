import TooltipBuilder from "@components/builder/tooltip";
import PhdpComponent from "@components/penggajian/phdp";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
    title: "Phdp",
}
const PhdpPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <TooltipBuilder text="Add Phdp" delayDuration={100}>
                        <ButtonLink
                            href="/penggajian/phdp/add"
                            icon={<PlusCircleIcon className=" h-5 w-5" />}
                            variant={"ghost"}
                            className="text-primary hover:opacity-75"
                            size={"icon"} />
                    </TooltipBuilder>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <PhdpComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default PhdpPage;