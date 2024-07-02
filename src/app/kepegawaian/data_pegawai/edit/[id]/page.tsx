import FormCard from "@components/form/card";
import PegawaiForm from "../../form";
import { getDataById } from "@helpers/action";
import type { Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";

export const metadata = {
    title: "Edit Data Pegawai/Biodata"
}
const EditPegawaiPage = async ({ params }: { params: { id: string } }) => {
    const pegawai = await getDataById<Pegawai>({ path: "pegawai/nik", id: params.id, isRoot: true })
    const biodata = await getDataById<Biodata>({ path: "profil/biodata", id: params.id, isRoot: true })
    return (
        <FormCard metadata={metadata}>
            <PegawaiForm
                pegawai={pegawai}
                biodata={biodata}
            />
        </FormCard>
    );
}

export default EditPegawaiPage;