import FormCard from "@components/form/card";
import JenisPelatihanFormComponent from "../form";

export const metadata = {
    title: "Tambah Jenis Pelatihan"
}

const AddJenisPelatihanPage = () => {
    return (
        <FormCard metadata={metadata}>
            <JenisPelatihanFormComponent />
        </FormCard>
    );
}

export default AddJenisPelatihanPage;