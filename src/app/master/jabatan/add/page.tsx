import FormCard from "@components/form/card";
import JabatanFormComponent from "../form";

export const metadata = {
    title: "Tambah Jabatan"
}

const AddJabatanPage = () => {
    return (
        <FormCard metadata={metadata}>
            <JabatanFormComponent />
        </FormCard>
    );
}

export default AddJabatanPage;