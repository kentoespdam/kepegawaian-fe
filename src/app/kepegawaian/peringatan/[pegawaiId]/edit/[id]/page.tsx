import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatSpFormComponent from "@components/kepegawaian/detail/peringatan/form.index";
import { getDataById } from "@helpers/action";

const metadata = {
	title: "Surat Peringatan",
};
const EditSpPage = async ({
	params,
}: { params: Promise<{ pegawaiId: number; id: number }> }) => {
	const { pegawaiId, id } = await params;
	const pegawai = await getDataById<PegawaiDetail>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatSp = await getDataById<RiwayatSp>({
		path: "kepegawaian/riwayat/sp",
		id,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatSpFormComponent pegawai={pegawai} data={riwayatSp} />
		</FormCard>
	);
};

export default EditSpPage;
