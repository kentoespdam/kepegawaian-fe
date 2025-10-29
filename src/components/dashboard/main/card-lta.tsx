import type { BaseCount } from "@_types/index";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { globalGetData } from "@helpers/action";
import Link from "next/link";

const DashboardLepasTanggunganAnakCard = async () => {
	const countLepasTanggunganAnak = await globalGetData<BaseCount>({
		path: "laporan/kepegawaian/lepas_tanggungan_anak/count",
		isRoot: true,
		searchParams: "filter=BULAN_INI",
	});

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Lepas Tanggungan Anak</CardDescription>
				<CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<Link href={"/laporan/kepegawaian/lta"} className="text-info">
						{countLepasTanggunganAnak.count} Anak
					</Link>
				</CardTitle>
			</CardHeader>
		</Card>
	);
};

export default DashboardLepasTanggunganAnakCard;
