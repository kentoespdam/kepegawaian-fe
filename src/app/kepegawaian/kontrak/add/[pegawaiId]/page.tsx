import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form.kontrak";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Kontrak Pegawai",
};
const AddKontrakPage = async ({
	params,
}: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataByIdEnc<Pegawai>({
		path: encodeString("pegawai"),
		id: encodeId(pegawaiId),
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatKontrakFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddKontrakPage;
