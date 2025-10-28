import type { StatistikGolongan } from "@_types/laporan/kepegawaian/lap_statistik";
import type { PegawaiDetail } from "@_types/pegawai";
import DashboardCardSection from "@components/dashboard/main/card-section";
import DasboardStatistikPegawai from "@components/dashboard/main/statistik";
import { Separator } from "@components/ui/separator";
import { getDataByIdEnc, globalGetData } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { getCurrentUser } from "@lib/appwrite/user";

export const metadata = { title: "Dashboard Pegawai" };
const DashboardPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: encodeString(user.$id),
		isRoot: true,
		isString: true,
	});

	const statistikData = await globalGetData<StatistikGolongan[]>({
		path: "laporan/kepegawaian/statistik/golongan",
	});
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<DashboardCardSection pegawai={pegawai} />
			<Separator />
			<DasboardStatistikPegawai slug="golongan" statistikData={statistikData} />
		</div>
	);
};

export default DashboardPage;
