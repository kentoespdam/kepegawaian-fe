import FormCard from "@components/form/card";
import RefPotonganTkkFormComponent from "@components/penggajian/potongan_tkk/form";

export const metadata = {
    title: "Tambah Ref Potongan TKK"
}
const AddRefPotonganTkkPage = () => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <RefPotonganTkkFormComponent/>
        </FormCard>
    );
}

export default AddRefPotonganTkkPage;