import FormCard from "@components/form/card";
import PegawaiForm from "./form";

export const metadata = {
    title: "Add Biodata"
}
const AddBiodata = () => {
    return (
        <FormCard metadata={metadata}>
            <PegawaiForm />
        </FormCard>
    );
}

export default AddBiodata;