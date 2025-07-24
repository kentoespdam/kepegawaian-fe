import type { DnpResponse } from "@_types/laporan/kepegawaian/dnp";
import DnpComponent from "@components/laporan/kepegawaian/dnp";
import DnpDownloadButton from "@components/laporan/kepegawaian/dnp/button.download";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { globalGetData } from "@helpers/action";
export const metadata = {
	title: "Daftar Nominatif Pegawai",
};
const DaftarNominatifPegawaiPage = async () => {
	const dnpResponse = await globalGetData<DnpResponse>({
		path: "laporan/kepegawaian/dnp",
		isRoot: true,
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					{metadata.title}
					<DnpDownloadButton />
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-2">
				<DnpComponent dnpResponse={dnpResponse} />
			</CardContent>
		</Card>
	);
};

export default DaftarNominatifPegawaiPage;
