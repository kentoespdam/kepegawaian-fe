import { BarcodeIcon, Settings2Icon } from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";

export const menuPenggajian: IMenu = {
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
};
