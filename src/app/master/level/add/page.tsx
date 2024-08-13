import FormCard from "@components/form/card";
import LevelFormComponent from "../form";

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