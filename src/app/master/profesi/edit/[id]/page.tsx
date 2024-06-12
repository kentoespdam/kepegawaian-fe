import type { Profesi } from "@_types/master/profesi";
import FormCard from "@components/form/card";
import { getMasterById } from "@helpers/action";
import ProfesiFormComponent from "../../form";

export const metadata = {
    title: "Edit Profesi"
}

const EditProfesiPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<Profesi>({
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