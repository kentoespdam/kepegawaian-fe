import type { KomponenGajiMini } from "@_types/penggajian/komponen";
import type { ProfilGaji } from "@_types/penggajian/profil";
import FormCard from "@components/form/card";
import KomponenGajiFormComponent from "@components/penggajian/komponent/form";
import { getDataById, globalGetData } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
    title: "Add Komponen Gaji",
}
const AddKomponenGajiPage = async ({ params }: { params: { profilId: number } }) => {
    const { profilId } = params

    const availableCode = await globalGetData<KomponenGajiMini[]>({
        path: `penggajian/komponen/${profilId}/kode`,
        isRoot: true
    })
    const profilGaji = await getDataById<ProfilGaji>({
        path: "penggajian/profil",
        id: `${profilId}`,
        isRoot: true
    })
    const urut = await getDataById<number>({
        path: "penggajian/komponen",
        id: `${profilId}/profil/urut`,
        isRoot: true
    })


    return (
        <FormCard metadata={metadata} className="min-h-full">
            <Suspense>
                <KomponenGajiFormComponent
                    availableCode={availableCode}
                    profilGaji={profilGaji} urut={urut + 1} />
            </Suspense>
        </FormCard>
    );
}

export default AddKomponenGajiPage;