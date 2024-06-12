import FormCard from "@components/form/card";
import AlatKerjaFormComponent from "../form";

export const metadata = {
    title: "Tambah Alat Kerja"
}

const AddAlatKerjaPage = () => {
    return (
        <FormCard metadata={metadata}>
            <AlatKerjaFormComponent />
        </FormCard>
    );
}

export default AddAlatKerjaPage;