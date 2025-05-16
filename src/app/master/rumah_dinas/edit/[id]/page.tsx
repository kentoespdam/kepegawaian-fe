import type { RumahDinas } from "@_types/master/rumah_dinas";
import FormCard from "@components/form/form.card";
import RumahDinasFormComponent from "@components/master/rumah_dinas/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Tambah Rumah Dinas"
}
const AddRumahDinasPage = async ({ params }: { params: Promise<{ id: number }> }) => {
    const rumahDinas = await getDataById<RumahDinas>({
        path: "rumah-dinas",
        id: (await params).id,
    });
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <RumahDinasFormComponent data={rumahDinas} />
        </FormCard>
    );
}

export default AddRumahDinasPage;