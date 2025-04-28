import {
	BarcodeIcon,
	BookOpenIcon,
	BracesIcon,
	ContactRoundIcon,
	CreditCardIcon,
	GitCompareArrowsIcon,
	GraduationCapIcon,
	HomeIcon,
	HousePlugIcon,
	ListCollapseIcon,
	ListPlusIcon,
	NavigationIcon,
	OctagonXIcon,
	RadicalIcon,
	Settings2Icon,
	ShovelIcon,
	SignalIcon,
	TelescopeIcon,
	UsersIcon,
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
	role: z.array(z.string()),
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
		role: ["USER"],
		subMenu: [
			{
				path: "/dashboard",
				name: "Dashboard",
				icon: <HomeIcon className={defaultIconClassName} />,
				role: ["USER"],
			},
		],
	},
	{
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
	},
	{
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
	},
	{
		path: "#",
		name: "Penggajian",
		type: "group",
		role: ["HRD", "ADMIN"],
		subMenu: [
			{
				path: "/penggajian/komponen_gaji",
				name: "Setting Komponen Gaji",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/proses_gaji",
				name: "01. Proses Gaji Bulanan",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/verif_phase_1",
				name: "02. Verifikasi Gapok, Tunjangan & Potongan",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/verif_phase_2",
				name: "03. Tambah Komponen Gaji",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/approval",
				name: "04. Persetujuan Akhir",
				icon: <BarcodeIcon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/kode_pajak",
				name: "Setting Pendapatan Non Pajak",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/tunjangan?jenisTunjangan=JABATAN",
				name: "Setting Tunjangan",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/parameter_setting",
				name: "Setting Lain-lain",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
			{
				path: "/penggajian/potongan_tkk",
				name: "Setting Ref Potongan TKK",
				icon: <Settings2Icon className={defaultIconClassName} />,
				role: ["HRD", "ADMIN"],
			},
		],
	},
	{
		path: "#",
		name: "System",
		type: "group",
		role: ["ADMIN"],
		subMenu: [
			{
				path: "/system/roles",
				name: "Roles",
				icon: <BracesIcon className={defaultIconClassName} />,
				role: ["SYSTEM"],
			},
			{
				path: "/system/users",
				name: "Users",
				icon: <UsersIcon className={defaultIconClassName} />,
				role: ["SYSTEM"],
			},
		],
	},
];
