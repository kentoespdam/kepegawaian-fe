import FormCard from "@components/form/card";
import ProfesiFormComponent from "@components/master/profesi/form.index";

export const metadata = {
    title: "Tambah Profesi"
}

const AddProfesiPage = () => {
    return (
        <FormCard metadata={metadata}>
            <ProfesiFormComponent />
        </FormCard>
    );
}

export default AddProfesiPage;