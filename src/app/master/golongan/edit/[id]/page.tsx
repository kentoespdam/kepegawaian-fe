import type { Golongan } from "@_types/master/golongan";
import FormCard from "@components/form/card";
import GolonganFormComponent from "@components/master/golongan/form.index";
import { getDataById } from "@helpers/action";

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