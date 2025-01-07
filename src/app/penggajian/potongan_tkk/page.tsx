import RefPotonganTkkComponent from "@components/penggajian/potongan_tkk";
import RefPotonganTkkAddButton from "@components/penggajian/potongan_tkk/butto.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
    title: "Setting Ref Potongan TKK",
}
const RefPotonganTkkPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <RefPotonganTkkAddButton />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <RefPotonganTkkComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default RefPotonganTkkPage;