import type { Golongan } from "@_types/master/golongan";
import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import GolonganFormComponent from "../../form";

export const metadata = {
    title: "Edit Golongan"
}

const EditGolonganPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Golongan>({
        path: "golongan",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <GolonganFormComponent data={data} />
        </FormCard>
    );
}

export default EditGolonganPage;