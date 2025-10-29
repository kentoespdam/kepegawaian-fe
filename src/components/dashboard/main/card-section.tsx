import type { PegawaiDetail } from "@_types/pegawai";
import type { User } from "@_types/user";
import DashboardKenaikanBerkalaCard from "./card-kgb";
import DashboardLepasTanggunganAnakCard from "./card-lta";
import DashboardCutiCard from "./cuti-card";

type DashboardCardSectionProps = {
	user: User;
	pegawai: PegawaiDetail;
};
const DashboardCardSection = ({ user,pegawai }: DashboardCardSectionProps) => {
	const roles = user.prefs.roles;
	return (
		<div className="grid gap-2 lg:grid-cols-4 sm:grid-cols-2">
			<DashboardCutiCard pegawai={pegawai} />
			{roles?.includes("ADMIN") || roles?.includes("HRD") ? (
				<>
					<DashboardKenaikanBerkalaCard />
					<DashboardLepasTanggunganAnakCard />
				</>
			) : null}
		</div>
	);
};

export default DashboardCardSection;
