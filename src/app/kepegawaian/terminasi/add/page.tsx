import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/form.card";
import TerminasiFormComponent from "@components/kepegawaian/terminasi/form.index";
import { getDataById } from "@helpers/action";

const metadata = {
	title: "Add Terminasi",
};

const AddTerminasiPage = async ({
	searchParams,
}: { searchParams: Promise<Record<string, unknown>> }) => {
	const id = (await searchParams).id ? Number((await searchParams).id) : 0;
	const pegawai =
		id === 0
			? undefined
			: await getDataById<Pegawai>({
					path: "pegawai",
					id: id,
					isRoot: true,
				});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<TerminasiFormComponent pegawai={pegawai} />
		</FormCard>
	);
};

export default AddTerminasiPage;
