import FormCard from "@components/form/card";
import JenisKeahlianFormComponent from "../form";

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