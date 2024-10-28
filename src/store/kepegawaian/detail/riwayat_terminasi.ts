import type {
	RiwayatTerminasi,
	RiwayatTerminasiSchema,
} from "@_types/kepegawaian/terminasi";
import type { Pegawai } from "@_types/pegawai";
import { create } from "zustand";

interface RiwayatTerminasiStore {
	riwayatTerminasiId: number;
	setRiwayatTerminasiId: (val: number) => void;
	defaultValues: RiwayatTerminasiSchema;
	setDefaultValues: (
		pegawai?: Pegawai,
		riwayatTerminasi?: RiwayatTerminasi,
	) => void;
}

export const useRiwayatTerminasiStore = create<RiwayatTerminasiStore>(
	(set) => ({
		riwayatTerminasiId: 0,
		setRiwayatTerminasiId: (val) =>
			set((state) => ({ ...state, riwayatTerminasiId: val })),
		defaultValues: {
			id: 0,
			pegawaiId: 0,
			nomorSk: "",
			jenisSk: "",
			tanggalSk: "",
			tmtBerlaku: "",
			golonganId: 0,
			gajiPokok: 0,
			mkgTahun: 0,
			mkgBulan: 0,
			kenaikanBerikutnya: "",
			mkgbTahun: 0,
			mkgbBulan: 0,
			updateMaster: false,
			nipam: "",
			nama: "",
			organisasiId: 0,
			namaOrganisasi: "",
			jabatanId: 0,
			namaJabatan: "",
			namaGolongan: "",
			notes: "",
		} as RiwayatTerminasiSchema,
		setDefaultValues: (pegawai, data) =>
			set((state) => ({
				...state,
				defaultValues: {
					id: data?.id ?? 0,
					pegawaiId: Number(pegawai?.id) ?? 0,
					nomorSk: data?.nomorSk ?? "",
					jenisSk: "SK_PENSIUN",
					tanggalSk: data?.skTerminasi.tanggalSk ?? "",
					tmtBerlaku: data?.skTerminasi.tmtBerlaku ?? "",
					golonganId: pegawai?.golongan?.id ?? 0,
					gajiPokok: data?.skTerminasi.gajiPokok ?? 0,
					mkgTahun: data?.skTerminasi.mkgTahun ?? 0,
					mkgBulan: data?.skTerminasi.mkgBulan ?? 0,
					kenaikanBerikutnya: data?.skTerminasi.kenaikanBerikutnya ?? "",
					mkgbTahun: data?.skTerminasi.mkgbTahun ?? 0,
					mkgbBulan: data?.skTerminasi.mkgbBulan ?? 0,
					updateMaster: data?.skTerminasi.updateMaster ?? false,
					nipam: pegawai?.nipam ?? "",
					nama: pegawai?.biodata.nama ?? "",
					organisasiId: pegawai?.organisasi?.id ?? 0,
					namaOrganisasi: pegawai?.organisasi?.nama ?? "",
					jabatanId: pegawai?.jabatan?.id ?? 0,
					namaJabatan: pegawai?.jabatan?.nama ?? "",
					namaGolongan: `${pegawai?.golongan.pangkat} -  ${pegawai?.golongan.golongan}`,
					notes: data?.notes ?? "",
				},
			})),
	}),
);
