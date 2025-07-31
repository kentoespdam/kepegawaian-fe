import { ContactRoundIcon, OctagonXIcon } from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";
export const menuKepegawaian: IMenu = {
	path: "#",
	name: "Kepegawaian",
	type: "group",
	role: ["ADMIN"],
	subMenu: [
		{
			path: "/kepegawaian/data_pegawai",
			name: "Data Pegawai",
			icon: <ContactRoundIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/kepegawaian/terminasi/will-retire",
			name: "Terminasi Pegawai",
			icon: <OctagonXIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
	],
};
