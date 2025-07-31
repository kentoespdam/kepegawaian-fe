import {
	BarcodeIcon,
	BookOpenIcon,
	CreditCardIcon,
	GitCompareArrowsIcon,
	GraduationCapIcon,
	HousePlugIcon,
	ListCollapseIcon,
	ListPlusIcon,
	NavigationIcon,
	OctagonXIcon,
	RadicalIcon,
	ShovelIcon,
	SignalIcon,
	TelescopeIcon,
} from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";

export const menuMaster: IMenu = {
	path: "#",
	name: "Master",
	type: "group",
	role: ["ADMIN"],
	subMenu: [
		{
			path: "/master/level",
			name: "Level",
			icon: <RadicalIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/grade",
			name: "Grade",
			icon: <NavigationIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/organisasi",
			name: "Organisasi",
			icon: <GitCompareArrowsIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jabatan",
			name: "Jabatan",
			icon: <SignalIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/profesi",
			name: "Profesi",
			icon: <ShovelIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/golongan",
			name: "Golongan",
			icon: <BarcodeIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jenis_keahlian",
			name: "Jenis Keahlian",
			icon: <TelescopeIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jenis_kitas",
			name: "Jenis Kartu Identitas",
			icon: <CreditCardIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jenis_pelatihan",
			name: "Jenis Pelatihan",
			icon: <BookOpenIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jenjang_pendidikan",
			name: "Jenjang Pendidikan",
			icon: <GraduationCapIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/jenis_sp",
			name: "Jenis SP",
			icon: <ListCollapseIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/sanksi",
			name: "Sanksi",
			icon: <ListPlusIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/alasan_berhenti",
			name: "Alasan Berhenti",
			icon: <OctagonXIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/master/rumah_dinas",
			name: "Rumah Dinas",
			icon: <HousePlugIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
	],
};
