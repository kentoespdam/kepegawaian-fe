import type { PendapatanNonPajak } from "@_types/penggajian/pendapatan_non_pajak";
import FormCard from "@components/form/form.card";
import KodePajakFormComponent from "@components/penggajian/kode_pajak/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Kode Pajak"
}
const EditKodePajakPage = async ({ params }: { params: Promise<{ id: string }>}) => {
    const data = await getDataById<PendapatanNonPajak>({
        path: "penggajian/pendapatan-non-pajak",
        id: (await params).id,
        isRoot: true
    })

    return (
        <FormCard metadata={metadata} className="min-h-full">
            <KodePajakFormComponent data={data} />
        </FormCard>
    );
}

export default EditKodePajakPage;