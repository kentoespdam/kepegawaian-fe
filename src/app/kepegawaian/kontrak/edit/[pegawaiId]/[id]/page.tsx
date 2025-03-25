import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form.kontrak";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Kontrak Pegawai",
};
const EditKontrakPage = async ({
	params,
}: { params: { pegawaiId: number; id: number } }) => {
	const { pegawaiId, id } = params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});

	const riwayatKontrak = await getDataById<RiwayatKontrak>({
		path: "kepegawaian/riwayat/kontrak",
		id: id,
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
