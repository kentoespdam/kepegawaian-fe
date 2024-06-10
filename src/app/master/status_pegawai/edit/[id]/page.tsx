import FormCard from "@components/form/card";
import { getStatusPegawaiById } from "../../action";
import StatusPegawaiForm from "../../form";
export const metadata = {
    title: "Edit Status Pegawai"
}
const EditStatusPegawaiPage = async ({
    params,
}: { params: { id: number } }) => {
    const { id } = params;
    const statusPegawai = await getStatusPegawaiById(id);

    return (
        <FormCard metadata={metadata}>
            <StatusPegawaiForm data={statusPegawai} />
        </FormCard >
    );
}

export default EditStatusPegawaiPage;