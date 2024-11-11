import FormCard from "@components/form/card";
import AlasanBerhentiFormComponent from "../form";
export const metadata = {
	title: "Tambah Alasan Berhenti",
};
const AddAlasanBerhentiPage = () => {
	return (
		<FormCard metadata={metadata}>
			<AlasanBerhentiFormComponent />
		</FormCard>
	);
};

export default AddAlasanBerhentiPage;
