import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi";
import type { Pegawai, PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatMutasiFormComponent from "@components/kepegawaian/detail/mutasi/form.index";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Mutasi Pegawai",
};
const EditMutasiPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: pegawaiId,
		isRoot: true,
	});
	const riwayatMutasi = await getDataByIdEnc<RiwayatMutasi>({
		path: encodeString("kepegawaian/riwayat/mutasi"),
		id: id,
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatMutasiFormComponent pegawai={pegawai} data={riwayatMutasi} />
		</FormCard>
	);
};

export default EditMutasiPage;
