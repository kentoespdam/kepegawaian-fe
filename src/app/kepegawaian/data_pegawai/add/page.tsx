import FormCard from "@components/form/card";
import PegawaiForm from "../form";

export const metadata = {
    title: "Tambah Data Pegawai/Biodata"
}
const TambahPegawai = () => {
    return (
        <FormCard metadata={metadata}>
            <PegawaiForm />
        </FormCard>
    );
}

export default TambahPegawai;