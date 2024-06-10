import FormCard from "@components/form/card";
import StatusPegawaiForm from "../form";

const metadata = { title: "Tambah Status Pegawai" }
const AddStatusPegawaiPage = () => {
    return (
        <FormCard metadata={metadata}>
            <StatusPegawaiForm />
        </FormCard>
    );
}

export default AddStatusPegawaiPage;