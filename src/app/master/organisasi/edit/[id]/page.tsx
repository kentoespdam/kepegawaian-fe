import type { Organisasi } from "@_types/master/organisasi";
import FormCard from "@components/form/form.card";
import OrganisasiFormComponent from "@components/master/organisasi/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Organisasi"
}

const EditOrganisasiPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Organisasi>({
        path: "organisasi",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <OrganisasiFormComponent data={data} />
        </FormCard>
    );
}

export default EditOrganisasiPage;