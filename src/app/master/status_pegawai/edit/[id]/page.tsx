import type { StatusPegawai } from "@_types/master/status_pegawai";
import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import StatusPegawaiForm from "../../form";
export const metadata = {
    title: "Edit Status Pegawai"
}
const EditStatusPegawaiPage = async ({
    params,
}: { params: { id: number } }) => {
    const { id } = params;
    const statusPegawai = await getDataById<StatusPegawai>({
        path: "status-pegawai",
        id,
    });

    return (
        <FormCard metadata={metadata}>
            <StatusPegawaiForm data={statusPegawai} />
        </FormCard >
    );
}

export default EditStatusPegawaiPage;