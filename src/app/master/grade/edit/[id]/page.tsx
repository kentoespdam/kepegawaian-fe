import type { Grade } from "@_types/master/grade";
import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import GradeFormComponent from "../../form";

export const metadata = {
    title: "Edit Grade"
}

const EditGradePage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Grade>({
        path: "grade",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <GradeFormComponent data={data} />
        </FormCard>
    );
}

export default EditGradePage;