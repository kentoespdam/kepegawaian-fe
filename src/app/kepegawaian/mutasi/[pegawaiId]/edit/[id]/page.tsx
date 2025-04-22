import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Mutasi Pegawai",
};
const EditMutasiPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatMutasi = await getDataById<RiwayatMutasi>({
		path: "kepegawaian/riwayat/mutasi",
		id,
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawai={pegawai} data={riwayatMutasi} />
		</FormCard>
	);
};

export default EditMutasiPage;
