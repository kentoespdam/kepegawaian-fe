import type {
	RiwayatKontrak,
	RiwayatKontrakSchema,
} from "@_types/kepegawaian/riwayat_kontrak";
import type { JenisKontrak } from "@_types/master/jenis_kontrak";
import type { PegawaiDetail } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface RiwayatKontrakStore extends SelectedHandlerStore {
	riwayatKontrakId: number;
	setRiwayatKontrakId: (val: number) => void;
	defaultValues: RiwayatKontrakSchema;
	setDefaultValues: (pegawai?: PegawaiDetail, schema?: RiwayatKontrak) => void;
	jenisKontrak?: JenisKontrak;
	setJenisKontrak: (val?: JenisKontrak) => void;
}

export const useRiwayatKontrakStore = create<RiwayatKontrakStore>((set) => ({
	riwayatKontrakId: 0,
	setRiwayatKontrakId: (val: number) => set({ riwayatKontrakId: val }),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		jenisKontrak: "",
		pegawaiId: 0,
		nipam: "",
		nama: "",
		unitKerja: "",
		jabatan: "",
		nomorKontrak: "",
		tanggalSk: "",
		tanggalMulai: "",
		tanggalSelesai: "",
		gajiPokok: 0,
		golonganId: 0,
		notes: "",
		fileName: "",
	},
	setDefaultValues: (pegawai, schema) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: schema?.id ?? 0,
				jenisKontrak: schema?.jenisKontrak ?? "",
				pegawaiId: pegawai?.id ?? 0,
				nipam: pegawai?.nipam ?? "",
				nama: pegawai?.biodata.nama ?? "",
				unitKerja: pegawai?.organisasi.nama ?? "",
				jabatan: pegawai?.jabatan.nama ?? "",
				nomorKontrak: schema?.nomorKontrak ?? "",
				tanggalSk: schema?.tanggalSk ?? "",
				tanggalMulai: schema?.tanggalMulai ?? "",
				tanggalSelesai: schema?.tanggalSelesai ?? "",
				golonganId: pegawai?.golongan ? pegawai.golongan.id : 0,
				gajiPokok: schema?.gajiPokok ?? 0,
				notes: schema?.notes ?? "",
			},
		})),
	setJenisKontrak: (val) => set({ jenisKontrak: val }),
}));
