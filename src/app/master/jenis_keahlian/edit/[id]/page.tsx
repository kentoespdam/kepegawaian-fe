import FormCard from "@components/form/form.card";
import { getDataById } from "@helpers/action";
import type { JenisKeahlian } from "@_types/master/jenis_keahlian";
import JenisKeahlianFormComponent from "@components/master/jenis_keahlian/form.index";

export const metadata = {
	title: "Edit Jenis Keahlian",
};
const EditJenisKeahlianPage = async ({
	params,
}: { params: Promise<{ id: number }> }) => {
	const data = await getDataById<JenisKeahlian>({
		path: "jenis_keahlian",
		id: (await params).id,
	});

	return (
		<FormCard metadata={metadata}>
			<JenisKeahlianFormComponent data={data} />
		</FormCard>
	);
};

export default EditJenisKeahlianPage;
