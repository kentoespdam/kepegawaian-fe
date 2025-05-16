import type { StrukturOrganisasi } from "@_types/laporan/kepegawaian/so";
import SoComponent from "@components/laporan/kepegawaian/struktur-organisasi/so";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Struktur Organisasi",
};
const StrukturOrganisasiPage = async () => {
	const so = await globalGetData<StrukturOrganisasi[]>({
		path: "laporan/kepegawaian/so",
		isRoot: true,
	});
	return <SoComponent so={so} />;
};

export default StrukturOrganisasiPage;
