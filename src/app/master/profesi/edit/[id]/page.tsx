import type { Profesi } from "@_types/master/profesi";
import FormCard from "@components/form/form.card";
import ProfesiFormComponent from "@components/master/profesi/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Profesi"
}

const EditProfesiPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Profesi>({
        path: "profesi",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <ProfesiFormComponent data={data} />
        </FormCard>
    );
}

export default EditProfesiPage;