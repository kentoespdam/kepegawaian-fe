import FormCard from "@components/form/card";
import JenisKitasFormComponent from "../../../../components/master/jenis_kitas/form.index";

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