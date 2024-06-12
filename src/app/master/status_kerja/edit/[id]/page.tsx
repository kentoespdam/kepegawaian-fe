import type { StatusKerja } from "@_types/master/status_kerja";
import FormCard from "@components/form/card";
import { getMasterById } from "@helpers/action";
import StatusKerjaFormComponent from "../../form";

export const metadata = {
    title: "Edit Status Kerja"
}

const EditStatusKerjaPage = async ({ params }: { params: { id: number } }) => {
    const data = await getMasterById<StatusKerja>({
        path: "status_kerja",
        id: params.id
    })
    return (
        <FormCard metadata={metadata}>
            <StatusKerjaFormComponent data={data} />
        </FormCard>
    );
}

export default EditStatusKerjaPage;