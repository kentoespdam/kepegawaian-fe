import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form.index";
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

export const metadata = {
	title: "Mutasi Pegawai",
};
const AddMutasiPage = async ({ params }: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatSp = await getPageDataEnc<RiwayatSp>({
		path: encodeString(`kepegawaian/riwayat/sp/pegawai/${pegawaiId}`),
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawai={pegawai} riwayatSp={riwayatSp} />
		</FormCard>
	);
};

export default AddMutasiPage;
