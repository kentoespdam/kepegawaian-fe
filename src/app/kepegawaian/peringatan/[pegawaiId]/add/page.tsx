import type { PegawaiDetail } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatSpFormComponent from "@components/kepegawaian/detail/peringatan/form.index";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

const metadata = {
	title: "Surat Peringatan",
};
const AddPeringatanPage = async ({
	params,
}: { params: { pegawaiId: string } }) => {
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: params.pegawaiId,
		isRoot: true,
	});

	return !pegawai ? null : (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatSpFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddPeringatanPage;
