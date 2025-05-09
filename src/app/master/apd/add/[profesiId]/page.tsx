import FormCard from "@components/form/form.card";
import ApdFormComponent from "@components/master/apd/form.index";

export const metadata = {
    title: "Tambah Alat Pelindung Diri"
}
const AddApdPage = ({ params }: { params: { profesiId: string } }) => {
    const profesiId = Number(params.profesiId);
    return (
        <FormCard metadata={metadata}>
            <ApdFormComponent profesiId={profesiId} />
        </FormCard>
    );
}

export default AddApdPage;