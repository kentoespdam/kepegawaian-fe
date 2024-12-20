import type { Apd } from "@_types/master/apd";
import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import ApdFormComponent from "../../form";

export const metadata = {
    title: "Edit Alat Pelindung Diri"
}

const EditApdPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Apd>({
        path: "apd",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <ApdFormComponent data={data} />
        </FormCard>
    );
}

export default EditApdPage;