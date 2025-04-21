import type { PegawaiDetail, ProfilGajiPegawaiSchema } from "@_types/pegawai";
import { create } from "zustand";

interface ProfilGajiPegawaiStore {
	defaultValues: ProfilGajiPegawaiSchema;
	setDefaultValues: (val?: PegawaiDetail) => void;
}

export const useProfilGajiPegawaiStore = create<ProfilGajiPegawaiStore>(
	(set) => ({
		defaultValues: {
			id: 0,
			nipam: "",
			nama: "",
			tmtKerja: "",
			tmtPegawai: "",
			golonganName: "",
			tmtGolongan: "",
			mkgTahun: 0,
			mkgBulan: 0,
			jabatanName: "",
			tmtJabatan: "",
			tmtPensiun: "",
			statusPegawai: "",
			gajiPokok: 0,
			kodePajakId: 0,
			gajiProfilId: 0,
			rumahDinasId: 0,
			phdp: 0,
			isAskes: false,
		},
		setDefaultValues: (val) =>
			set((state) => ({
				...state,
				defaultValues: {
					id: val?.id || 0,
					nipam: val?.nipam || "",
					nama: val?.biodata.nama || "",
					tmtKerja: val?.tmtKerja || "",
					tmtPegawai: val?.skPegawai?.tmtBerlaku || "",
					golonganName: val?.golongan
						? `${val?.golongan.pangkat} - ${val?.golongan.pangkat}`
						: "",
					tmtGolongan: val?.skGolongan?.tmtBerlaku || "",
					mkgTahun: val?.mkgTahun || 0,
					mkgBulan: val?.mkgBulan || 0,
					jabatanName: val?.jabatan.nama || "",
					tmtJabatan: val?.skJabatan?.tmtBerlaku || "",
					tmtPensiun: val?.tmtPensiun || "",
					statusPegawai: val?.statusPegawai || "",
					gajiPokok: val?.gajiPokok || 0,
					kodePajakId: val?.kodePajak?.id || 0,
					gajiProfilId: val?.gajiProfil?.id || 0,
					rumahDinasId: val?.rumahDinas?.id || 0,
					phdp: val?.phdp || 0,
					isAskes: val?.isAskes || false,
				},
			})),
	}),
);
