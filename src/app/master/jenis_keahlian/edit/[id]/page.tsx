import FormCard from "@components/form/card";
import JenisKeahlianFormComponent from "../../form";
import { getDataById } from "@helpers/action";
import type { JenisKeahlian } from "@_types/master/jenis_keahlian";

export const metadata = {
    title: "Edit Jenis Keahlian"
}
const EditJenisKeahlianPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<JenisKeahlian>({
        path: "jenis_keahlian",
        id: params.id
    })

    return (
        <FormCard metadata={metadata}>
            <JenisKeahlianFormComponent data={data} />
        </FormCard>
    );
}

export default EditJenisKeahlianPage;