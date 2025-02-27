import FormCard from "@components/form/card";
import AlasanBerhentiFormComponent from "@components/master/alasan-berhenti/form.index";
import { Suspense } from "react";
export const metadata = {
	title: "Tambah Alasan Berhenti",
};
const AddAlasanBerhentiPage = () => {
	return (
		<FormCard metadata={metadata}>
			<Suspense fallback={<div>Loading...</div>}>
				<AlasanBerhentiFormComponent />
			</Suspense>
		</FormCard>
	);
};

export default AddAlasanBerhentiPage;
