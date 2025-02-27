import FormCard from "@components/form/card";
import KodePajakFormComponent from "@components/penggajian/kode_pajak/form.index";

export const metadata = {
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