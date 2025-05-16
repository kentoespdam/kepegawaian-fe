import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form.index";
import { getDataById, getPageData } from "@helpers/action";

export const metadata = {
	title: "Mutasi Pegawai",
};
const AddMutasiPage = async ({ params }: { params: Promise<{ pegawaiId: number }> }) => {
	const { pegawaiId } = await params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatSp = await getPageData<RiwayatSp>({
		path: `kepegawaian/riwayat/sp/pegawai/${pegawaiId}`,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawai={pegawai} riwayatSp={riwayatSp} />
		</FormCard>
	);
};

export default AddMutasiPage;
