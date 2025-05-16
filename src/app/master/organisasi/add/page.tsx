import FormCard from "@components/form/form.card";
import OrganisasiFormComponent from "@components/master/organisasi/form.index";

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