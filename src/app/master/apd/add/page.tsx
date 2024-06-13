import FormCard from "@components/form/card";
import ApdFormComponent from "../form";

export const metadata = {
    title: "Tambah Alat Pelindung Diri"
}

const AddApdPage = () => {
    return (
        <FormCard metadata={metadata}>
            <ApdFormComponent />
        </FormCard>
    );
}

export default AddApdPage;