import FormCard from "@components/form/card";
import LevelFormComponent from "../../form";
import { getDataById } from "@helpers/action";
import type { Level } from "@_types/master/level";

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