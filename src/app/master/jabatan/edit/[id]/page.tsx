import type { Jabatan } from "@_types/master/jabatan";
import FormCard from "@components/form/card";
import { getMasterById } from "@helpers/action";
import JabatanFormComponent from "../../form";

export const metadata = {
    title: "Edit Jabatan"
}

const EditJabatanPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<Jabatan>({
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