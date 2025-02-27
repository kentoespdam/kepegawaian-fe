import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";
import FormCard from "@components/form/card";
import JenisPelatihanFormComponent from "@components/master/jenis_pelatihan/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Jenis Pelatihan"
}
const EditJenisPelatihanPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<JenisPelatihan>({
        path: "jenis_pelatihan",
        id: params.id
    })

    return (
        <FormCard metadata={metadata}>
            <JenisPelatihanFormComponent data={data} />
        </FormCard>
    );
}

export default EditJenisPelatihanPage;