import FormCard from "@components/form/card";
import RumahDinasFormComponent from "@components/master/rumah_dinas/form";

export const metadata = {
    title: "Tambah Rumah Dinas"
}
const AddRumahDinasPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <RumahDinasFormComponent />
        </FormCard>
    );
}

export default AddRumahDinasPage;