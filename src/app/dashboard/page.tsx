import type { StatistikGolongan } from "@_types/laporan/kepegawaian/lap_statistik";
import DashboardCardSection from "@components/dashboard/main/card-section";
import DasboardStatistikPegawai from "@components/dashboard/main/statistik";
import { Separator } from "@components/ui/separator";
import { globalGetData } from "@helpers/action";
import getAppData from "@lib/app-data";

export const metadata = { title: "Dashboard Pegawai" };
const DashboardPage = async () => {
	const { user, pegawai } = await getAppData();

	const statistikData = await globalGetData<StatistikGolongan[]>({
		path: "laporan/kepegawaian/statistik/golongan",
	});
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<DashboardCardSection user={user} pegawai={pegawai} />
			<Separator />
			<DasboardStatistikPegawai slug="golongan" statistikData={statistikData} />
		</div>
	);
};

export default DashboardPage;
