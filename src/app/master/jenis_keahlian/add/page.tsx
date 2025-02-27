import FormCard from "@components/form/card";
import JenisKeahlianFormComponent from "../../../../components/master/jenis_keahlian/form.index";

export const metadata = {
    title: "Tambah Jenis Keahlian"
}

const AddJenisKeahlianPage = () => {
    return (
        <FormCard metadata={metadata}>
            <JenisKeahlianFormComponent />
        </FormCard>
    );
}

export default AddJenisKeahlianPage;