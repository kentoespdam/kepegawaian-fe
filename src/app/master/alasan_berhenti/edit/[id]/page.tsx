import FormCard from "@components/form/card";
import AlasanBerhentiFormComponent from "../../../../../components/master/alasan-berhenti/form.index";
import { getDataById } from "@helpers/action";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";

export const metadata = {
	title: "Edit Alasan Berhenti",
};
const EditAlasanBerhentiPage = async ({
	params,
}: { params: { id: number } }) => {
	const data = await getDataById<AlasanBerhenti>({
		path: "alasan_berhenti",
		id: params.id,
	});

	return (
		<FormCard metadata={metadata}>
			<AlasanBerhentiFormComponent data={data} />
		</FormCard>
	);
};

export default EditAlasanBerhentiPage;
