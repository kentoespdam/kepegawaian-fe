import FormCard from "@components/form/card";
import ApdFormComponent from "@components/master/apd/form";

export const metadata = {
    title: "Tambah Alat Pelindung Diri"
}
const AddApdPage = ({ params }: { params: { profesiId: string } }) => {
    return (
        <FormCard metadata={metadata}>
            <ApdFormComponent />
        </FormCard>
    );
}

export default AddApdPage;