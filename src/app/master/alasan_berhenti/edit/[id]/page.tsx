import FormCard from "@components/form/form.card";
import { getDataById } from "@helpers/action";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";
import AlasanBerhentiFormComponent from "@components/master/alasan-berhenti/form.index";

export const metadata = {
	title: "Edit Alasan Berhenti",
};
const EditAlasanBerhentiPage = async ({
	params,
}: { params: Promise<{ id: number }> }) => {
	const data = await getDataById<AlasanBerhenti>({
		path: "alasan_berhenti",
		id: (await params).id,
	});

	return (
		<FormCard metadata={metadata}>
			<AlasanBerhentiFormComponent data={data} />
		</FormCard>
	);
};

export default EditAlasanBerhentiPage;
