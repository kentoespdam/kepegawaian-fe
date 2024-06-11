import FormCard from "@components/form/card";
import LevelFormComponent from "../../form";
import { getMasterById } from "@helpers/action";
import { Level } from "@_types/master/level";

export const metadata = {
    title: "Edit Level"
}
const EditLevelPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<Level>({
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