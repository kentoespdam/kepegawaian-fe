import type { Grade } from "@_types/master/grade";
import FormCard from "@components/form/form.card";
import GradeFormComponent from "@components/master/grade/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Grade"
}

const EditGradePage = async ({ params }: { params: Promise<{ id: number }> }) => {
    const data = await getDataById<Grade>({
        path: "grade",
        id: (await params).id
    })
    return (
        <FormCard metadata={metadata}>
            <GradeFormComponent data={data} />
        </FormCard>
    );
}

export default EditGradePage;