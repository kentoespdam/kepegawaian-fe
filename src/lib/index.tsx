import { USER_ROLE, UserRole } from "@_types/index";
import {
	BarcodeIcon,
	BookOpenIcon,
	ContactRoundIcon,
	CreditCardIcon,
	GitCompareArrowsIcon,
	GraduationCapIcon,
	HammerIcon,
	HomeIcon,
	HousePlugIcon,
	NavigationIcon,
	OctagonXIcon,
	RadicalIcon,
	Settings2Icon,
	ShieldIcon,
	ShovelIcon,
	SignalIcon,
	TelescopeIcon
} from "lucide-react";
import type React from "react";
import { z } from "zod";

export type ChildrenNode = {
	children: React.ReactNode;
};

const defaultIconClassName = "w-3 h-3";

const MenuType = z.enum(["group", "item"]);
type MenuType = z.infer<typeof MenuType>;

export const IMenu = z.object({
	path: z.string(),
	name: z.string(),
	role: UserRole,
	type: MenuType.optional(),
});

export type IMenu = z.infer<typeof IMenu> & {
	icon?: React.ReactElement;
	subMenu?: IMenu[];
};

export const menus: IMenu[] = [
	{
		path: "#",
		name: "Navigation",
		type: "group",
		role: "USER",
		subMenu: [
			{
				path: "/dashboard",
				name: "Dashboard",
				icon: <HomeIcon className={defaultIconClassName} />,
				role: "USER",
			},
		],
	},
	{
		path: "#",
		name: "Master",
		type: "group",
		role: "ADMIN",
		subMenu: [
			// {
			//     path: "/master/status_pegawai",
			//     name: "Status Pegawai",
			//     icon: <BoxesIcon className={defaultIconClassName} />,
			//     role: USER_ROLE.ADMIN,
			// },
			// {
			//     path: "/master/status_kerja",
			//     name: "Status Kerja",
			//     icon: <CircleCheckBigIcon className={defaultIconClassName} />,
			//     role: USER_ROLE.ADMIN,
			// },
			{
				path: "/master/golongan",
				name: "Golongan",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/level",
				name: "Level",
				icon: <RadicalIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/grade",
				name: "Grade",
				icon: <NavigationIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/profesi",
				name: "Profesi",
				icon: <ShovelIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/alat_kerja",
				name: "Alat Kerja",
				icon: <HammerIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/apd",
				name: "APD",
				icon: <ShieldIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/organisasi",
				name: "Organisasi",
				icon: <GitCompareArrowsIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/jabatan",
				name: "Jabatan",
				icon: <SignalIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/jenis_keahlian",
				name: "Jenis Keahlian",
				icon: <TelescopeIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/jenis_kitas",
				name: "Jenis Kartu Identitas",
				icon: <CreditCardIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/jenis_pelatihan",
				name: "Jenis Pelatihan",
				icon: <BookOpenIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/jenjang_pendidikan",
				name: "Jenjang Pendidikan",
				icon: <GraduationCapIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/alasan_berhenti",
				name: "Alasan Berhenti",
				icon: <OctagonXIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/rumah-dinas",
				name: "Rumah Dinas",
				icon: <HousePlugIcon className={defaultIconClassName} />,
				role: USER_ROLE.ADMIN,
			},
		],
	},
	{
		path: "#",
		name: "Kepegawaian",
		type: "group",
		role: "ADMIN",
		subMenu: [
			{
				path: "/kepegawaian/data_pegawai",
				name: "Data Pegawai",
				icon: <ContactRoundIcon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/kepegawaian/terminasi/will-retire",
				name: "Terminasi Pegawai",
				icon: <OctagonXIcon className={defaultIconClassName} />,
				role: "ADMIN",
			},
		],
	},
	{
		path: "#",
		name: "Penggajian",
		type: "group",
		role: "ADMIN",
		subMenu: [
			{
				path: "/penggajian/komponen-gaji",
				name: "Setting Komponen Gaji",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/proses-gaji",
				name: "01. Proses Gaji Bulanan",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/kode-pajak",
				name:"Setting Pendapatan Non Pajak",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/tunjangan",
				name:"Setting Tunjangan",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/ptkp",
				name: "Setting PTKP",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/lain-lain",
				name: "Setting Lain-lain",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			},
			{
				path: "/penggajian/phdp",
				name: "Setting PHDP",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: "ADMIN",
			}
		],
	}
];
