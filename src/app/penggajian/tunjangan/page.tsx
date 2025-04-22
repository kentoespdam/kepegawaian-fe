import TunjanganComponent from "@components/penggajian/tunjangan";
import AddTunjanganButton from "@components/penggajian/tunjangan/button.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = { title: "Tunjangan" }
const TunjanganPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <Suspense>
                        <AddTunjanganButton />
                    </Suspense>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <TunjanganComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default TunjanganPage;