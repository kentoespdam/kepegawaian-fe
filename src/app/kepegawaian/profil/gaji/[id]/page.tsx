import type { Pegawai } from "@_types/pegawai";
import { getDataById } from "@helpers/action";

const ProfilGaji = async ({ params }: { params: { id: number } }) => {
    const pegawai = await getDataById<Pegawai>({
        path: "pegawai",
        id: params.id,
        isRoot: true
    })
    return (
        <div>
            Enter
        </div>
    );
}

export default ProfilGaji;