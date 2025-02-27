import type { Pegawai, PegawaiDetail } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import FormCard from "@components/form/card";
import PegawaiForm from "@components/kepegawaian/data_pegawai/form.index";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Edit Data Pegawai/Biodata",
};
const EditPegawaiPage = async ({ params }: { params: { id: string } }) => {
	const pegawai = await getDataById<PegawaiDetail>({
		path: "pegawai",
		id: params.id,
		isRoot: true,
	});
	const biodata = await getDataById<Biodata>({
		path: "profil/biodata",
		id: pegawai.biodata.nik,
		isRoot: true,
	});
	return (
		<FormCard metadata={metadata}>
			<PegawaiForm pegawai={pegawai} biodata={biodata} />
		</FormCard>
	);
};

export default EditPegawaiPage;
