import type { AlatKerja } from "@_types/master/alat_kerja";
import FormCard from "@components/form/card";
import { getMasterById } from "@helpers/action";
import AlatKerjaFormComponent from "../../form";

export const metadata = {
    title: "Edit AlatKerja"
}

const EditAlatKerjaPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<AlatKerja>({
        path: "alat_kerja",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <AlatKerjaFormComponent data={data} />
        </FormCard>
    );
}

export default EditAlatKerjaPage;