import FormCard from "@components/form/card";
import GradeFormComponent from "@components/master/grade/form.index";

export const metadata = {
    title: "Tambah Grade"
}

const AddGradePage = () => {
    return (
        <FormCard metadata={metadata}>
            <GradeFormComponent />
        </FormCard>
    );
}

export default AddGradePage;