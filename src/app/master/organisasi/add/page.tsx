import FormCard from "@components/form/card";
import OrganisasiFormComponent from "../form";

export const metadata = {
    title: "Tambah Organisasi"
}

const AddOrganisasiPage = () => {
    return (
        <FormCard metadata={metadata}>
            <OrganisasiFormComponent />
        </FormCard>
    );
}

export default AddOrganisasiPage;