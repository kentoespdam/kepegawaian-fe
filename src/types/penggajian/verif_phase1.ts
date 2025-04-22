import type { CustomColumnDef } from "..";

export const verifPhase1Columns: CustomColumnDef[] = [
	{ id: "id", label: "" },
	{ id: "nipam", label: "NIK" },
	{ id: "nama", label: "Nama Pegawai" },
	{ id: "golonganId", label: "golongan" },
	{ id: "jabatanId", label: "jabatan" },
	{ id: "jmlJiwa", label: "Jiwa" },
	{ id: "kodePajak", label: "PTKP" },
	{ id: "penghasilanKotor", label: "Penghasilan" },
	{ id: "totalPotongan", label: "Potongan" },
	{ id: "pembulatan", label: "Pembulatan" },
	{ id: "penghasilanBersih", label: "Net. Gaji" },
];
