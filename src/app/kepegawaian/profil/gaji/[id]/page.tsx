import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/card";
import ProfilGajiFormComponent from "@components/penggajian/profil";
import { getDataById } from "@helpers/action";

export const metadata = {
    title: "Edit Profil Gaji"
}
const ProfilGaji = async ({ params }: { params: { id: number } }) => {
    const pegawai = await getDataById<PegawaiDetail>({
        path: "pegawai",
        id: params.id,
        isRoot: true
    })
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <ProfilGajiFormComponent pegawai={pegawai} />
        </FormCard>
    );
}

export default ProfilGaji;