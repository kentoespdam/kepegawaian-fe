import type {
	RiwayatMutasi,
	RiwayatMutasiSchema,
} from "@_types/kepegawaian/riwayat-mutasi";
import type { JenisMutasi } from "@_types/master/jenis_mutasi";
import type { Pegawai } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface RiwayatMutasiStore extends SelectedHandlerStore {
	riwayatMutasiId: number;
	setRiwayatMutasiId: (id: number) => void;
	defaultValues: RiwayatMutasiSchema;
	setDefaultValues: (pegawai?: Pegawai, riwayatMutasi?: RiwayatMutasi) => void;
	jenisMutasi?: JenisMutasi;
	setJenisMutasi: (val?: JenisMutasi) => void;
}

export const useRiwayatMutasiStore = create<RiwayatMutasiStore>((set, get) => ({
	riwayatMutasiId: 0,
	setRiwayatMutasiId: (id) => set({ riwayatMutasiId: id }),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		nomorSk: "",
		jenisSk: "SK_MUTASI",
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
		tglBerakhir: "",
		jenisMutasi: "",
		organisasiId: 0,
		jabatanId: 0,
		profesiId: 0,
		golonganLamaId: 0,
		namaGolonganLama: "",
		organisasiLamaId: 0,
		namaOrganisasiLama: "",
		jabatanLamaId: 0,
		namaJabatanLama: "",
		profesiLamaId: 0,
		namaProfesiLama: "",
		notes: "",
	},
	setDefaultValues: (pegawai, riwayatMutasi) => {
		return set((state) => ({
			...state,
			defaultValues: {
				id: riwayatMutasi ? +riwayatMutasi.id : 0,
				pegawaiId: pegawai ? +pegawai.id : 0,
				nipam: pegawai?.nipam ?? "",
				nama: pegawai?.biodata.nama ?? "",
				nomorSk: riwayatMutasi?.skMutasi?.nomorSk ?? "",
				jenisSk: riwayatMutasi?.skMutasi?.jenisSk ?? "SK_MUTASI",
				tanggalSk: riwayatMutasi?.skMutasi?.tanggalSk ?? "",
				tmtBerlaku: riwayatMutasi?.skMutasi?.tmtBerlaku ?? "",
				gajiPokok: riwayatMutasi?.skMutasi?.gajiPokok ?? 0,
				mkgTahun: riwayatMutasi?.skMutasi?.mkgTahun ?? 0,
				mkgBulan: riwayatMutasi?.skMutasi?.mkgBulan ?? 0,
				kenaikanBerikutnya: riwayatMutasi?.skMutasi?.kenaikanBerikutnya ?? "",
				mkgbTahun: riwayatMutasi?.skMutasi?.mkgbTahun ?? 0,
				mkgbBulan: riwayatMutasi?.skMutasi?.mkgbBulan ?? 0,
				updateMaster: riwayatMutasi?.skMutasi?.updateMaster ?? false,
				tglBerakhir: riwayatMutasi?.tglBerakhir ?? "",
				jenisMutasi: riwayatMutasi?.jenisMutasi ?? "",
				golonganLamaId: pegawai
					? pegawai.statusPegawai === "KOTRAK"
						? 0
						: pegawai.golongan?.id
					: 0,
				namaGolonganLama:
					`${pegawai?.golongan?.golongan} - ${pegawai?.golongan?.pangkat}` ??
					"",
				organisasiLamaId: pegawai ? +pegawai.organisasi.id : 0,
				namaOrganisasiLama: pegawai?.organisasi.nama ?? "",
				jabatanLamaId: pegawai ? +pegawai.jabatan.id : 0,
				namaJabatanLama: pegawai?.jabatan.nama ?? "",
				profesiLamaId: pegawai ? +pegawai.profesi.id : 0,
				namaProfesiLama: pegawai?.profesi.nama ?? "",
				golonganId: riwayatMutasi?.skMutasi?.golongan
					? riwayatMutasi.skMutasi.golongan.id
					: 0,
				organisasiId: riwayatMutasi?.organisasi
					? riwayatMutasi.organisasi.id
					: 0,
				jabatanId: riwayatMutasi?.jabatan ? +riwayatMutasi.jabatan.id : 0,
				jabatan: riwayatMutasi?.jabatan ?? undefined,
				profesiId: pegawai ? +pegawai.profesi.id : 0,
				notes: riwayatMutasi?.notes ?? "",
			},
		}));
	},
	setJenisMutasi: (val) => set({ jenisMutasi: val }),
}));
