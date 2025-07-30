import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatSpFormComponent from "@components/kepegawaian/detail/peringatan/form.index";
import { getDataById, getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

const metadata = {
	title: "Surat Peringatan",
};
const EditSpPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatSp = await getDataByIdEnc<RiwayatSp>({
		path: encodeString("kepegawaian/riwayat/sp"),
		id: id,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatSpFormComponent pegawai={pegawai} data={riwayatSp} />
		</FormCard>
	);
};

export default EditSpPage;
