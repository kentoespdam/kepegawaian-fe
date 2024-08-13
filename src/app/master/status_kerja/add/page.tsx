import FormCard from "@components/form/card";
import StatusKerjaFormComponent from "../form";

export const metadata = {
    title: "Tambah Status Kerja"
}

const AddStatusKerjaPage = () => {
    return (
        <FormCard metadata={metadata}>
            <StatusKerjaFormComponent />
        </FormCard>
    );
}

export default AddStatusKerjaPage;