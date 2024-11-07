import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Mutasi Pegawai",
};
const AddMutasiPage = async ({ params }: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddMutasiPage;
