import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import RiwayatKontrakFormComponent from "@components/kepegawaian/detail/kontrak/form";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Kontrak Pegawai",
};
const AddKontrakPage = async ({
	params,
}: { params: { pegawaiId: number } }) => {
	const { pegawaiId } = params;
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: pegawaiId,
		isRoot: true,
	});
	
	return (
		<FormCard metadata={metadata} className="min-h-full">
			<RiwayatKontrakFormComponent pegawaiId={pegawaiId} pegawai={pegawai} />
		</FormCard>
	);
};

export default AddKontrakPage;