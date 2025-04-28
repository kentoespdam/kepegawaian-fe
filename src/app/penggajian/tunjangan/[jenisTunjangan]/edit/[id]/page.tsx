import type { Tunjangan } from "@_types/penggajian/tunjangan";
import FormCard from "@components/form/form.card";
import TunjanganFormComponent from "@components/penggajian/tunjangan/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Tunjangan"
}
const EditTunjanganPage = async ({ params }: { params: { jenisTunjangan: string, id: number } }) => {
    const data = await getDataById<Tunjangan>({
        path: `penggajian/tunjangan/${params.jenisTunjangan}`,
        id: params.id,
        isRoot: true
    })
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <TunjanganFormComponent jenisTunjangan={params.jenisTunjangan} data={data} />
        </FormCard>
    );
}

export default EditTunjanganPage;