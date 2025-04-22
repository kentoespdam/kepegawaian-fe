import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import EditProfilPribadiFormComponent from "@components/kepegawaian/data_pegawai/profil/pribadi";
import { getDataById } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
    title: "Edit Profil Pribadi"
}
const EditProfilPribadiPage = async ({ params }: { params: { id: number } }) => {
    const pegawai = await getDataById<PegawaiDetail>({
        path: "pegawai",
        id: params.id,
        isRoot: true
    })
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <Suspense fallback={<div>Loading...</div>}>
                <EditProfilPribadiFormComponent pegawai={pegawai} />
            </Suspense>
        </FormCard>
    );
}

export default EditProfilPribadiPage;