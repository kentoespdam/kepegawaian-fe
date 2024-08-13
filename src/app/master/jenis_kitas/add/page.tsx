import FormCard from "@components/form/card";
import JenisKitasFormComponent from "../form";

export const metadata = {
    title: "Tambah Jenis Kartu Identitas"
}

const AddJenisKitasPage = () => {
    return (
        <FormCard metadata={metadata}>
            <JenisKitasFormComponent />
        </FormCard>
    );
}

export default AddJenisKitasPage;