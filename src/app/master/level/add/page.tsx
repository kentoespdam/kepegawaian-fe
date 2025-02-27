import FormCard from "@components/form/card";
import LevelFormComponent from "@components/master/level/form.index";

export const metadata = {
    title: "Tambah Level"
}

const AddLevelPage = () => {
    return (
        <FormCard metadata={metadata}>
            <LevelFormComponent />
        </FormCard>
    );
}

export default AddLevelPage;