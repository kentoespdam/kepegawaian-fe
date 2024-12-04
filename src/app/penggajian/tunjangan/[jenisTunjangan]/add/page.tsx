import FormCard from "@components/form/card";
import TunjanganFormComponent from "@components/kepegawaian/penggajian/tunjangan/form";

export const metadata = {
    title: "Tambah Tunjangan"
}
const AddTunjanganPage = async ({ params }: { params: { jenisTunjangan: string } }) => {
    return (
        <FormCard metadata={metadata} className="min-h-full">
            <TunjanganFormComponent jenisTunjangan={params.jenisTunjangan} />
        </FormCard>
    );
}

export default AddTunjanganPage;