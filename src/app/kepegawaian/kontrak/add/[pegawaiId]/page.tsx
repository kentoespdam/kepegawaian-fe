import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form.kontrak";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Kontrak Pegawai",
};
const AddKontrakPage = async ({
	params,
}: { params: Promise<{ pegawaiId: number }> }) => {
	const { pegawaiId } = await params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatKontrakFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddKontrakPage;
