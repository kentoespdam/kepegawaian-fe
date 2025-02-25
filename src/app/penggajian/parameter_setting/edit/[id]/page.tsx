import type { ParameterSetting } from "@_types/penggajian/parameter_setting";
import { getDataById } from "@helpers/action";
import FormCard from "@components/form/card";
import ParameterSettingFormComponent from "@components/penggajian/parameter_setting/form";

export const metadata = {
    title: "Edit Parameter Setting Gaji"
}
const EditParameterSettingPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<ParameterSetting>({
        path: "penggajian/parameter-setting",
        id: params.id,
        isRoot: true
    })

    return (
        <FormCard metadata={metadata} className="min-h-full">
            <ParameterSettingFormComponent data={data} />
        </FormCard>
    );
}

export default EditParameterSettingPage;