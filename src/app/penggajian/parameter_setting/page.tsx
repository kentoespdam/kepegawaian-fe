import ParameterSettingComponent from "@components/penggajian/parameter_setting";
import AddParameterSettingButton from "@components/penggajian/parameter_setting/button.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
    title: "Setting Parameter Gaji"
}
const ParameterSettingPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                    <Suspense>
                        <AddParameterSettingButton />
                    </Suspense>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <ParameterSettingComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default ParameterSettingPage;