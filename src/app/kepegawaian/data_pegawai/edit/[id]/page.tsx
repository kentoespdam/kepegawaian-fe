import type { Pegawai, PegawaiDetail } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import FormCard from "@components/form/form.card";
import PegawaiForm from "@components/kepegawaian/data_pegawai/form.index";
import { getDataById, getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

export const metadata = {
	title: "Edit Data Pegawai/Biodata",
};
const EditPegawaiPage = async ({ params }: { params: { id: string } }) => {
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: encodeString(params.id),
		isRoot: true,
		isString: true,
	});
	const biodata = await getDataByIdEnc<Biodata>({
		path: encodeString("profil/biodata"),
		id: encodeString(pegawai.biodata.nik),
		isRoot: true,
		isString: true,
	});
	return (
		<FormCard metadata={metadata}>
			<PegawaiForm pegawai={pegawai} biodata={biodata} />
		</FormCard>
	);
};

export default EditPegawaiPage;
