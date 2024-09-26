import FormCard from "@components/form/card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form";

export const metadata = {
	title: "Kontrak Pegawai",
};
const AddKontrakPage = ({ params }: { params: { id: number } }) => {
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatKontrakFormComponent pegawaiId={params.id} />
		</FormCard>
	);
};

export default AddKontrakPage;
