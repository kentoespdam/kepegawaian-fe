import FormCard from "@components/form/card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form";

export const metadata = {
	title: "Mutasi Pegawai",
};
const AddMutasiPage = ({ params }: { params: { id: number } }) => {
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawaiId={params.id} />
		</FormCard>
	);
};

export default AddMutasiPage;
