import type { Phdp } from "@_types/penggajian/phdp";
import FormCard from "@components/form/card";
import PhdpFormComponent from "@components/penggajian/phdp/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Tambah PHDP"
}
const EditPhdpPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<Phdp>({
        path: "penggajian/phdp",
        id: params.id,
        isRoot: true
    })
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <PhdpFormComponent data={data} />
        </FormCard>
    );
}

export default EditPhdpPage;