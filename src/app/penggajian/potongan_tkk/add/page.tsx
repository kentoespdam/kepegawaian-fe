import FormCard from "@components/form/card";
import RefPotonganTkkFormComponent from "@components/penggajian/potongan_tkk/form.index";
import { Suspense } from "react";

export const metadata = {
    title: "Tambah Ref Potongan TKK"
}
const AddRefPotonganTkkPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <Suspense>
                <RefPotonganTkkFormComponent />
            </Suspense>
        </FormCard>
    );
}

export default AddRefPotonganTkkPage;