import FormCard from "@components/form/form.card";
import TunjanganFormComponent from "@components/penggajian/tunjangan/form.index";

export const metadata = {
	title: "Tambah Tunjangan",
};
const AddTunjanganPage = async ({
	params,
}: { params: Promise<{ jenisTunjangan: string }> }) => {
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<TunjanganFormComponent jenisTunjangan={(await params).jenisTunjangan} />
		</FormCard>
	);
};

export default AddTunjanganPage;
