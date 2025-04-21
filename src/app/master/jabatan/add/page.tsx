import FormCard from "@components/form/form.card";
import JabatanFormComponent from "@components/master/jabatan/form.index";

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