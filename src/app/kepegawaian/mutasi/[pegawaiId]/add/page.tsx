import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form.index";
import { getDataByIdEnc, getPageDataEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Mutasi Pegawai",
};
const AddMutasiPage = async ({ params }: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataByIdEnc<Pegawai>({
		path: encodeString("pegawai"),
		id: encodeId(pegawaiId),
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
