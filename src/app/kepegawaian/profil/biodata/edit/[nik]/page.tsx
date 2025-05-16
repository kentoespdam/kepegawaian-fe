import type { Biodata } from "@_types/profil/biodata";
import FormCard from "@components/form/form.card";
import PegawaiForm from "@components/kepegawaian/data_pegawai/form.index";
import { getDataById } from "@helpers/action";
import { Suspense } from "react";

export const metadata = {
	title: "Edit Data Biodata",
};

const EditBiodata = async ({ params }: { params: Promise<{ nik: string }> }) => {
	const biodata = await getDataById<Biodata>({
		path: "profil/biodata",
		id: (await params).nik,
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
