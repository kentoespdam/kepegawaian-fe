import { FileTextIcon } from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";
export const menuLaporanKepegawaian: IMenu = {
	path: "#",
	name: "Laporan Kepegawaian",
	type: "group",
	role: ["ADMIN"],
	subMenu: [
		{
			path: "/laporan/kepegawaian/duk",
			name: "Daftar Urut Kepangkatan",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/dnp",
			name: "Daftar Nominatif Pegawai",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/so",
			name: "Struktur Organisasi",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/statistik/golongan",
			name: "Statistik Pegawai",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/cuti",
			name: "Cuti Pegawai",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/mutasi",
			name: "Mutasi Pegawai",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/monitor_kontrak/AKTIF",
			name: "Monitoring Kontrak",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/lta",
			name: "Lepas Tanggungan Anak",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/dkb",
			name: "Daftar Kenaikan Gaji/Pangkat Berkala",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
		{
			path: "/laporan/kepegawaian/pensiun",
			name: "Daftar Pensiun",
			icon: <FileTextIcon className={defaultIconClassName} />,
			role: ["ADMIN"],
		},
	],
};
