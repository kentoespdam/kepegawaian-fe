import FormCard from "@components/form/card";
import ParameterSettingFormComponent from "@components/penggajian/parameter_setting/form";

export const metadata = {
    title: "Tambah Parameter Setting Gaji"
}
const AddParameterSettingPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <ParameterSettingFormComponent />
        </FormCard>
    );
}

export default AddParameterSettingPage;