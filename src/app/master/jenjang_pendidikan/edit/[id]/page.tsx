import type { JenjangPendidikan } from "@_types/master/jenjang_pendidikan";
import FormCard from "@components/form/form.card";
import JenjangPendidikanFormComponent from "@components/master/jenjang_pendidikan/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Jenis Pelatihan"
}
const EditJenjangPendidikanPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<JenjangPendidikan>({
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