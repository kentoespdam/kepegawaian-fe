import FormCard from "@components/form/form.card";
import GolonganFormComponent from "@components/master/golongan/form.index";

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