import KodePajakFormComponent from "@components/kepegawaian/penggajian/kode_pajak/form";
import FormCard from "@components/form/card";

const metadata = {
    title: "Tambah Kode Pajak"
}
const AddKodePajakPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <KodePajakFormComponent />
        </FormCard>
    );
}

export default AddKodePajakPage;