import FormCard from "@components/form/card";
import JenisPelatihanFormComponent from "../../../../components/master/jenis_pelatihan/form.index";

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