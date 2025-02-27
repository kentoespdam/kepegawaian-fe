import type { KomponenGaji, KomponenGajiMini } from "@_types/penggajian/komponen";
import FormCard from "@components/form/card";
import KomponenGajiFormComponent from "@components/penggajian/komponen/form.index";
import { getDataById, globalGetData } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
    title: "Edit Komponen Gaji",
}
const EditKomponenGajiPage = async ({ params }: { params: { profilId: number, id: number } }) => {
    const { profilId, id } = params
    const komponenGaji = await getDataById<KomponenGaji>({
        path: "penggajian/komponen",
        id: `${id}/detail`,
        isRoot: true
    })
    const availableCode = await globalGetData<KomponenGajiMini[]>({
        path: `penggajian/komponen/${profilId}/kode`,
        isRoot: true
    })

    return (
        <FormCard metadata={metadata} className="min-h-full">
            <Suspense>
                <KomponenGajiFormComponent availableCode={availableCode} profilGaji={komponenGaji.profilGaji} komponenGaji={komponenGaji} />
            </Suspense>
        </FormCard>
    );
}

export default EditKomponenGajiPage;