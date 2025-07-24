import type { StatistikGolongan } from "@_types/laporan/kepegawaian/LapStatistik";
import StatistikComponent from "@components/laporan/kepegawaian/statistik";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Laporan Statistik Pegawai",
};
const StatistikPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const statistikData = await globalGetData<StatistikGolongan[]>({
		path: `laporan/kepegawaian/statistik/${slug}`,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>{metadata.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<StatistikComponent slug={slug} statistikData={statistikData} />
			</CardContent>
		</Card>
	);
};

export default StatistikPage;
