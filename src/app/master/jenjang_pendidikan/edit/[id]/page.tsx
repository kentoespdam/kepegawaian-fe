import FormCard from "@components/form/card";
import JenjangPendidikanFormComponent from "../../form";
import { getMasterById } from "@helpers/action";
import type { JenjangPendidikan } from "@_types/master/jenjang_pendidikan";

export const metadata = {
    title: "Edit Jenis Pelatihan"
}
const EditJenjangPendidikanPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<JenjangPendidikan>({
        path: "jenjang_pendidikan",
        id: params.id
    })

    return (
        <FormCard metadata={metadata}>
            <JenjangPendidikanFormComponent data={data} />
        </FormCard>
    );
}

export default EditJenjangPendidikanPage;