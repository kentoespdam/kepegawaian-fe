import type { DUK } from "@_types/laporan/kepegawaian/duk";
import LapDukComponent from "@components/laporan/kepegawaian/duk";
import DukDownloadButton from "@components/laporan/kepegawaian/duk/button.download";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Daftar Urut Kepegawaian",
};
const DaftarUrutKepegawaianPage = async () => {
	const duk = await globalGetData<DUK[]>({
		path: "laporan/kepegawaian/duk",
		isRoot: true,
	});
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						{metadata.title}
						<DukDownloadButton />
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<LapDukComponent duk={duk} />
				</CardContent>
			</Card>
		</div>
	);
};

export default DaftarUrutKepegawaianPage;
