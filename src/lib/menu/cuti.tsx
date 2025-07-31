import {
	HousePlugIcon,
	ListCollapseIcon,
	ListPlusIcon,
	ShovelIcon,
} from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";

export const menuCuti: IMenu = {
	path: "#",
	name: "Cuti Pegawai",
	type: "group",
	role: ["USER"],
	subMenu: [
		{
			path: `/cuti/kuota?tahun=${new Date().getFullYear()}`,
			name: "Kuota Cuti Pegawai",
			icon: <HousePlugIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: `/cuti/pengajuan?tahun=${new Date().getFullYear()}`,
			name: "Pengajuan Cuti Pegawai",
			icon: <ShovelIcon className={defaultIconClassName} />,
			role: ["USER"],
		},
		{
			path: "/cuti/persetujuan",
			name: "Persetujuan Cuti Pegawai",
			icon: <ListPlusIcon className={defaultIconClassName} />,
			role: ["USER"],
		},
		{
			path: "/cuti/monitoring",
			name: "Monitoring Cuti yang bisa diambil",
			icon: <ListCollapseIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
	],
};
