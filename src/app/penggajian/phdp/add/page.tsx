import FormCard from "@components/form/card";
import PhdpFormComponent from "@components/penggajian/phdp/form.index";

export const metadata = {
    title: "Tambah PHDP"
}
const AddPhdpPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <PhdpFormComponent />
        </FormCard>
    );
}

export default AddPhdpPage;