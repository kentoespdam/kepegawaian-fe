import { keahlianCrudConfig } from "@/config/profil/keahlian.config";
import { keluargaCrudConfig } from "@/config/profil/keluarga.config";
import { pelatihanCrudConfig } from "@/config/profil/pelatihan.config";
import { pendidikanCrudConfig } from "@/config/profil/pendidikan.config";
import { pengalamanKerjaCrudConfig } from "@/config/profil/pengalaman-kerja.config";
import { boolStr, hubunganKeluarga, jenisMutasi, jenisSk, rp, spSeverity, t, val } from "@/lib/kepegawaian-formatters";
import { cn, formatDate } from "@/lib/utils";
import type { SectionConf } from "@/types/kepegawaian/dashboard";

/** Section config for all 10 dashboard right-panel sections. */
export const SECTIONS: SectionConf[] = [
	{
		id: "keluarga",
		label: "Data Keluarga",
		buildUrl: (_, nik, p) => `/api/proxy/profil/keluarga?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama", primary: true },
			{ id: "hubunganKeluarga", header: "Hubungan", cell: (r) => hubunganKeluarga(r.hubunganKeluarga) },
			{ id: "tanggalLahir", header: "Tgl Lahir", cell: (r) => formatDate(r.tanggalLahir) },
			{ id: "tanggungan", header: "Tanggungan", cell: (r) => boolStr(r.tanggungan) },
		],
		crudConfig: keluargaCrudConfig,
	},
	{
		id: "pendidikan",
		label: "Data Pendidikan",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pendidikan?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "institusi", header: "Institusi", primary: true },
			{ id: "jenjangPendidikan", header: "Jenjang", cell: (r) => t(r.jenjangPendidikan) },
			{ id: "jurusan", header: "Jurusan" },
			{ id: "tahunLulus", header: "Tahun Lulus", cell: (r) => val(r.tahunLulus) },
		],
		crudConfig: pendidikanCrudConfig,
	},
	{
		id: "pengalaman-kerja",
		label: "Data Pengalaman Kerja",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pengalaman-kerja?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "namaPerusahaan", header: "Perusahaan", primary: true },
			{ id: "jabatan", header: "Jabatan" },
			{ id: "tahunMasuk", header: "Tahun Masuk", cell: (r) => val(r.tahunMasuk) },
			{ id: "tahunKeluar", header: "Tahun Keluar", cell: (r) => val(r.tahunKeluar) },
		],
		crudConfig: pengalamanKerjaCrudConfig,
	},
	{
		id: "keahlian",
		label: "Data Keahlian",
		buildUrl: (_, nik, p) => `/api/proxy/profil/keahlian?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "jenisKeahlian", header: "Keahlian", primary: true, cell: (r) => t(r.jenisKeahlian) },
			{ id: "kualifikasi", header: "Kualifikasi" },
			{ id: "sertifikasi", header: "Sertifikasi", cell: (r) => boolStr(r.sertifikasi) },
			{ id: "tahun", header: "Tahun", cell: (r) => val(r.tahun) },
		],
		crudConfig: keahlianCrudConfig,
	},
	{
		id: "pelatihan",
		label: "Data Pelatihan",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pelatihan?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama Pelatihan", primary: true },
			{ id: "lembaga", header: "Lembaga" },
			{ id: "tanggalMulai", header: "Tgl Mulai", cell: (r) => formatDate(r.tanggalMulai) },
			{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (r) => formatDate(r.tanggalSelesai) },
		],
		crudConfig: pelatihanCrudConfig,
	},
	{
		id: "mutasi",
		label: "Riwayat Mutasi",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/mutasi/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "jenisMutasi", header: "Jenis", primary: true, cell: (r) => jenisMutasi(r.jenisMutasi) },
			{ id: "namaOrganisasi", header: "Organisasi" },
			{ id: "namaJabatan", header: "Jabatan" },
			{ id: "tmtBerlaku", header: "TMT", cell: (r) => formatDate(r.tmtBerlaku) },
		],
	},
	{
		id: "sk",
		label: "Riwayat SK",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sk/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSk", header: "No. SK", primary: true },
			{ id: "jenisSk", header: "Jenis", cell: (r) => jenisSk(r.jenisSk) },
			{ id: "tanggalSk", header: "Tgl. SK", cell: (r) => formatDate(r.tanggalSk) },
			{ id: "tmtBerlaku", header: "TMT", cell: (r) => formatDate(r.tmtBerlaku) },
		],
	},
	{
		id: "kontrak",
		label: "Riwayat Kontrak",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorKontrak", header: "No. Kontrak", primary: true },
			{ id: "tanggalMulai", header: "Tgl Mulai", cell: (r) => formatDate(r.tanggalMulai) },
			{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (r) => formatDate(r.tanggalSelesai) },
		],
	},
	{
		id: "penggajian",
		label: "Riwayat Penggajian",
		buildUrl: (id) => `/api/proxy/penggajian/batch/master/pegawai/${id}`,
		columns: [
			{ id: "periode", header: "Periode", primary: true },
			{ id: "gajiPokok", header: "Gaji Pokok", cell: (r) => rp(r.gajiPokok) },
			{ id: "penghasilanKotor", header: "Penghasilan Kotor", cell: (r) => rp(r.penghasilanKotor) },
			{ id: "totalPotongan", header: "Potongan", cell: (r) => rp(r.totalPotongan) },
			{ id: "pajak", header: "Pajak", cell: (r) => rp(r.pajak) },
			{
				id: "penghasilanBersihFinal",
				header: "Penghasilan Bersih",
				cell: (r) => <span className="font-semibold text-foreground">{rp(r.penghasilanBersihFinal)}</span>,
			},
		],
		isSingleItem: true,
	},
	{
		id: "sp",
		label: "Riwayat Disiplin / SP",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sp/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSp", header: "No. SP", primary: true },
			{
				id: "jenisSp",
				header: "Jenis SP",
				cell: (r) => <span className={cn(spSeverity(r.jenisSp), "font-medium")}>{t(r.jenisSp)}</span>,
			},
			{ id: "tanggalSp", header: "Tgl. SP", cell: (r) => formatDate(r.tanggalSp) },
		],
	},
];
