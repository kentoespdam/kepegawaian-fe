import FormCard from "@components/form/card";
import AlatKerjaFormComponent from "@components/master/alat_kerja/form.index";

export const metadata = {
    title: "Tambah Alat Kerja"
}
const AddAlatKerjaPage = ({ params }: { params: { profesiId: string } }) => {
    const profesiId = Number(params.profesiId);
    return (
        <FormCard metadata={metadata}>
            <AlatKerjaFormComponent profesiId={profesiId} />
        </FormCard>
    );
}

export default AddAlatKerjaPage;