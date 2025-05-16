import type { ParameterSetting } from "@_types/penggajian/parameter_setting";
import FormCard from "@components/form/form.card";
import ParameterSettingFormComponent from "@components/penggajian/parameter_setting/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Parameter Setting Gaji"
}
const EditParameterSettingPage = async ({ params }: { params: Promise<{ id: number }> }) => {
    const data = await getDataById<ParameterSetting>({
        path: "penggajian/parameter-setting",
        id: (await params).id,
        isRoot: true
    })

    return (
        <FormCard metadata={metadata} className="min-h-full">
            <ParameterSettingFormComponent data={data} />
        </FormCard>
    );
}

export default EditParameterSettingPage;