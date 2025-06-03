import type { LepasTanggunganAnak } from "@_types/laporan/kepegawaian/lta";
import LapLtaComponent from "@components/laporan/kepegawaian/lta";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Daftar Lepas Tanggungan Anak",
};

const DaftarLepasTanggunganAnakPage = async ({
	searchParams,
}: { searchParams: { filter: string } }) => {
	const { filter = "BULAN_INI" } = searchParams;
	const url = "laporan/kepegawaian/lepas_tanggungan_anak";
	const data = await globalGetData<LepasTanggunganAnak[]>({
		path: url,
		isRoot: true,
		searchParams: `filter=${filter}`,
	});
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						{metadata.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<LapLtaComponent data={data} filter={filter} />
				</CardContent>
			</Card>
		</div>
	);
};

export default DaftarLepasTanggunganAnakPage;
