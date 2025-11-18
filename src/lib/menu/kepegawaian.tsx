import {
  CheckCircle2,
  ContactRoundIcon,
  HomeIcon,
  OctagonXIcon,
} from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";
export const menuKepegawaian: IMenu = {
	path: "#",
	name: "Kepegawaian",
	type: "group",
	role: ["ADMIN","HRD"],
	subMenu: [
		{
			path: "/kepegawaian/dashboard",
			name: "Dashboard Pegawai",
			icon: <HomeIcon className={defaultIconClassName} />,
			role: ["ADMIN","HRD"],
		},
		{
			path: "/kepegawaian/data_pegawai",
			name: "Data Pegawai",
			icon: <ContactRoundIcon className={defaultIconClassName} />,
			role: ["ADMIN","HRD"],
		},
		{
			path: "/kepegawaian/terminasi/will-retire",
			name: "Terminasi Pegawai",
			icon: <OctagonXIcon className={defaultIconClassName} />,
			role: ["ADMIN","HRD"],
		},
    {
			path: "/kepegawaian/profil/approval",
			name: "Validasi Perubahan",
			icon: <CheckCircle2 className={defaultIconClassName} />,
			role: ["ADMIN","HRD"],
		},
	],
};
