import type { Biodata } from "@_types/profil/biodata";
import PegawaiForm from "@app/kepegawaian/data_pegawai/form";
import FormCard from "@components/form/card";
import { getDataById } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
	title: "Edit Data Biodata",
};

const EditBiodata = async ({ params }: { params: { nik: string } }) => {
	const biodata = await getDataById<Biodata>({
		path: "profil/biodata",
		id: params.nik,
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata}>
			<Suspense fallback={<div>Loading...</div>}>
				<PegawaiForm biodata={biodata} />
			</Suspense>
		</FormCard>
	);
};

export default EditBiodata;
