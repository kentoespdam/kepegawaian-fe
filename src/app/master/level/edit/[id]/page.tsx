import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import type { Level } from "@_types/master/level";
import LevelFormComponent from "@components/master/level/form.index";

export const metadata = {
    title: "Edit Level"
}
const EditLevelPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Level>({
        path: "level",
        id: params.id
    })

    return (
        <FormCard metadata={metadata}>
            <LevelFormComponent data={data} />
        </FormCard>
    );
}

export default EditLevelPage;