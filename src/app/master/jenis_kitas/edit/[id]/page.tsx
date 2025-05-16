import type { JenisKitas } from "@_types/master/jenis_kitas";
import FormCard from "@components/form/form.card";
import JenisKitasFormComponent from "@components/master/jenis_kitas/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Jenis Kartu Identitas"
}
const EditJenisKitasPage = async ({ params }: { params: Promise<{ id: number }> }) => {
    const data = await getDataById<JenisKitas>({
        path: "jenis_kitas",
        id: (await params).id
    })

    return (
        <FormCard metadata={metadata}>
            <JenisKitasFormComponent data={data} />
        </FormCard>
    );
}

export default EditJenisKitasPage;