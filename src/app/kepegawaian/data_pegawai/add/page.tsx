import FormCard from "@components/form/card";
import PegawaiForm from "@components/kepegawaian/data_pegawai/form.index";
import { Suspense } from "react";

export const metadata = {
    title: "Tambah Data Pegawai/Biodata"
}
const TambahPegawai = () => {
    return (
        <FormCard metadata={metadata}>
            <Suspense fallback={<div>Loading...</div>}>
                <PegawaiForm />
            </Suspense>
        </FormCard>
    );
}

export default TambahPegawai;