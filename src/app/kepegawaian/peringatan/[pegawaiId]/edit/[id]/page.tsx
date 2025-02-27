import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import RiwayatSpFormComponent from "@components/kepegawaian/detail/peringatan/form/form.index";
import { getDataById } from "@helpers/action";

const metadata = {
	title: "Surat Peringatan",
};
const EditSpPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataById<Pegawai>({
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
