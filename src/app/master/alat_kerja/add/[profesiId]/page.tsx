import FormCard from "@components/form/form.card";
import AlatKerjaFormComponent from "@components/master/alat_kerja/form.index";

export const metadata = {
	title: "Tambah Alat Kerja",
};
const AddAlatKerjaPage = async ({
	params,
}: { params: Promise<{ profesiId: string }> }) => {
	const profesiId = Number((await params).profesiId);
	return (
		<FormCard metadata={metadata}>
			<AlatKerjaFormComponent profesiId={profesiId} />
		</FormCard>
	);
};

export default AddAlatKerjaPage;
