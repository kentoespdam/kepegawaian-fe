
import FormCard from "@components/form/form.card";
import JenjangPendidikanFormComponent from "@components/master/jenjang_pendidikan/form.index";

export const metadata = {
    title: "Tambah Jenjang Pendidikan"
}

const AddJenjangPendidikanPage = () => {
    return (
        <FormCard metadata={metadata}>
            <JenjangPendidikanFormComponent />
        </FormCard>
    );
}

export default AddJenjangPendidikanPage;