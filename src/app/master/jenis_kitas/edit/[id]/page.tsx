import FormCard from "@components/form/card";
import JenisKitasFormComponent from "../../form";
import { getMasterById } from "@helpers/action";
import type { JenisKitas } from "@_types/master/jenis_kitas";

export const metadata = {
    title: "Edit Jenis Kartu Identitas"
}
const EditJenisKitasPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<JenisKitas>({
        path: "jenis_kitas",
        id: params.id
    })

    return (
        <FormCard metadata={metadata}>
            <JenisKitasFormComponent data={data} />
        </FormCard>
    );
}

export default EditJenisKitasPage;