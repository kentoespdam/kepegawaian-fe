import type { Organisasi } from "@_types/master/organisasi";
import FormCard from "@components/form/card";
import { getMasterById } from "@helpers/action";
import OrganisasiFormComponent from "../../form";

export const metadata = {
    title: "Edit Organisasi"
}

const EditOrganisasiPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<Organisasi>({
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