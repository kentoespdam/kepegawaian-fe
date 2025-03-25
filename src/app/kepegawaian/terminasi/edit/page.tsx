import type { RiwayatTerminasi } from "@_types/kepegawaian/terminasi";
import type { Pegawai } from "@_types/pegawai";
import FormCard from "@components/form/card";
import TerminasiFormComponent from "@components/kepegawaian/terminasi/form.index";
import { getDataById } from "@helpers/action";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Edit Data Terminasi",
};
const EditTerminasiPage = async ({
	searchParams,
}: { searchParams: Record<string, string> }) => {
	const id = searchParams.id ? +searchParams.id : 0;
	if (id === 0) redirect("/kepegawaian/terminasi");
	const riwayatTerminasi = await getDataById<RiwayatTerminasi>({
		path: "kepegawaian/riwayat/terminasi",
		id: id,
		isRoot: true,
	});

	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: riwayatTerminasi.pegawai.id,
		isRoot: true,
	});

	return (
		<FormCard metadata={metadata} className="min-h-full">
			<TerminasiFormComponent pegawai={pegawai} data={riwayatTerminasi} />
		</FormCard>
	);
};

export default EditTerminasiPage;
