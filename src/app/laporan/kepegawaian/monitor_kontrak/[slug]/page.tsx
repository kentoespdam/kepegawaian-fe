import type { Kontrak } from "@_types/laporan/kepegawaian/kontrak";
import LapKontrakComponent from "@components/laporan/kepegawaian/kontrak";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Monitoring Kontrak",
};

const MonintoringKontrakPage = async ({
	params,
}: { params: { slug: string } }) => {
	const { slug } = params;

	const data = await globalGetData<Kontrak[]>({
		path: "laporan/kepegawaian/kontrak",
		isRoot: true,
		searchParams: `filter=${slug}`,
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
					<LapKontrakComponent data={data} />
				</CardContent>
			</Card>
		</div>
	);
};

export default MonintoringKontrakPage;
