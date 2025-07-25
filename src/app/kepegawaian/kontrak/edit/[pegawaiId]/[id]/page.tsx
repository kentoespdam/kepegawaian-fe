import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form.kontrak";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Kontrak Pegawai",
};
const EditKontrakPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataByIdEnc<Pegawai>({
		path: encodeString("pegawai"),
		id: encodeId(pegawaiId),
		isRoot: true,
	});

	const riwayatKontrak = await getDataByIdEnc<RiwayatKontrak>({
		path: encodeString("kepegawaian/riwayat/kontrak"),
		id: encodeId(id),
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatKontrakFormComponent
				pegawai={pegawai}
				riwayatKontrak={riwayatKontrak}
			/>
		</FormCard>
	);
};

export default EditKontrakPage;
