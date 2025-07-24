import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb";
import LapKenaikanBerkalaComponent from "@components/laporan/kepegawaian/dkb";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Daftar Kenaikan Gaji/Pangkat Berkala",
};

const DaftarKenaikanBerkalaPage = async ({
	searchParams,
}: {
	searchParams: { filter: string };
}) => {
	const { filter = "BULAN_INI" } = searchParams;
	const url = "laporan/kepegawaian/kenaikan_berkala";
	const data = await globalGetData<KenaikanBerkala[]>({
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
					<LapKenaikanBerkalaComponent data={data} filter={filter} />
				</CardContent>
			</Card>
		</div>
	);
};

export default DaftarKenaikanBerkalaPage;
