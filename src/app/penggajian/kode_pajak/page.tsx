import TooltipBuilder from "@components/builder/tooltip";
import KodePajakComponent from "@components/penggajian/kode_pajak";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
    title: "Pendapatan Non Pajak",
};

const KodePajakPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <TooltipBuilder text="Add Pendapatan Non Pajak">
                        <ButtonLink
                            href="/penggajian/kode_pajak/add"
                            icon={<PlusCircleIcon className=" h-5 w-5" />}
                            variant={"ghost"}
                            className="text-primary hover:opacity-75"
                            size={"icon"} />
                    </TooltipBuilder>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <KodePajakComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default KodePajakPage;