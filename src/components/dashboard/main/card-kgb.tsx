import type { BaseCount } from "@_types/index";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { globalGetData } from "@helpers/action";
import Link from "next/link";

const DashboardKenaikanBerkalaCard = async () => {
	const countPangkat = await globalGetData<BaseCount>({
		path: "laporan/kepegawaian/kenaikan_berkala/count",
		isRoot: true,
		searchParams: "filter=BULAN_INI&jenisSk=SK_KENAIKAN_PANGKAT_GOLONGAN",
	});
	const countGaji = await globalGetData<BaseCount>({
		path: "laporan/kepegawaian/kenaikan_berkala/count",
		isRoot: true,
		searchParams: "filter=BULAN_INI&jenisSk=SK_KENAIKAN_GAJI_BERKALA",
	});

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Kenaikan Berkala</CardDescription>
				<CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<Link
						href={"/laporan/kepegawaian/dkb/golongan"}
						className="text-info"
					>
						<p>{countPangkat.count} Kenaikan Pangkat/Golongan</p>
					</Link>
					<Link href={"/laporan/kepegawaian/dkb/gaji"} className="text-info">
						<p>{countGaji.count} Kenaikan Gaji Berkala</p>
					</Link>
				</CardTitle>
			</CardHeader>
		</Card>
	);
};

export default DashboardKenaikanBerkalaCard;
