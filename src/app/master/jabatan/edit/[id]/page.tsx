import type { Jabatan } from "@_types/master/jabatan";
import FormCard from "@components/form/form.card";
import JabatanFormComponent from "@components/master/jabatan/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Jabatan"
}

const EditJabatanPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Jabatan>({
        path: "jabatan",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <JabatanFormComponent data={data} />
        </FormCard>
    );
}

export default EditJabatanPage;