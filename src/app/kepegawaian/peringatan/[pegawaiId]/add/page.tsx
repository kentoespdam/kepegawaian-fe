import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import RiwayatSpFormComponent from "@components/kepegawaian/detail/peringatan/form.index";
import { getDataById } from "@helpers/action";

const metadata = {
	title: "Surat Peringatan",
};
const AddPeringatanPage = async ({
	params,
}: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatSpFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddPeringatanPage;
