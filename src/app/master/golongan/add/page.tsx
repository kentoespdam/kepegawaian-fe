import FormCard from "@components/form/card";
import GolonganFormComponent from "../form";

export const metadata = {
    title: "Tambah Golongan"
}

const AddGolonganPage = () => {
    return (
        <FormCard metadata={metadata}>
            <GolonganFormComponent />
        </FormCard>
    );
}

export default AddGolonganPage;