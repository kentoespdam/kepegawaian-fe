import type { RefPotonganTkk } from "@_types/penggajian/ref_potongan_tkk";
import FormCard from "@components/form/form.card";
import RefPotonganTkkFormComponent from "@components/penggajian/potongan_tkk/form.index";
import { getDataById } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
    title: "Edit Ref Potongan TKK"
}
const EditRefPotonganTkkPage = async ({ params }: { params: { id: number } }) => {
    const data = await getDataById<RefPotonganTkk>({
        path: "penggajian/potongan-tkk",
        id: params.id,
        isRoot: true
    })
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <Suspense>
                <RefPotonganTkkFormComponent data={data} />
            </Suspense>
        </FormCard>
    );
}

export default EditRefPotonganTkkPage;