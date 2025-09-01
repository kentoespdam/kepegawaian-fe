import type { PegawaiDetail } from "@_types/pegawai";
import DashboardCutiCard from "./cuti-card";

const DashboardCardSection = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	return (
		<div className="grid gap-2 lg:grid-cols-4 sm:grid-cols-2">
			<DashboardCutiCard pegawai={pegawai} />
		</div>
	);
};

export default DashboardCardSection;
