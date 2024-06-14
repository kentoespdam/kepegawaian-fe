
import FormCard from "@components/form/card";
import JenjangPendidikanFormComponent from "../form";

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