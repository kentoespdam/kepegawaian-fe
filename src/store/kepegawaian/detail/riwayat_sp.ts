import type {
	RiwayatSp,
	RiwayatSpSchema,
} from "@_types/kepegawaian/riwayat-sp";
import type { JenisSp } from "@_types/master/jenis_sp";
import type { Pegawai } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface RiwayatSpStore extends SelectedHandlerStore {
	riwayatSpId: number;
	setRiwayatSpId: (val: number) => void;
	defaultValues: RiwayatSpSchema;
	setDefaultValues: (pegawai?: Pegawai, data?: RiwayatSp) => void;
	jenisSp?: JenisSp;
	setJenisSp: (val?: JenisSp) => void;
}

export const useRiwayatSpStore = create<RiwayatSpStore>((set, get) => ({
	riwayatSpId: 0,
	setRiwayatSpId: (val: number) => {
		set({ riwayatSpId: val });
	},
	selectedDataId: 0,
	setSelectedDataId: (val: number) => set({ selectedDataId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		organisasiId: 0,
        namaOrganisasi: "",
		jabatanId: 0,
        namaJabatan: "",
		nomorSp: "",
		tanggalSp: "",
		jenisSp: "",
		tanggalMulai: "",
		tanggalSelesai: "",
		penandaTangan: "",
		jabatanPenandaTangan: "",
		notes: "",
	},
	setDefaultValues: (pegawai?: Pegawai, data?: RiwayatSp) => {
		return set((state) => ({
			...state,
			defaultValues: {
				id: data?.id ?? 0,
				pegawaiId: pegawai ? +pegawai.id : 0,
				nipam: pegawai?.nipam ?? "",
				nama: pegawai?.biodata.nama ?? "",
				organisasiId: data
					? +data.organisasi.id
					: pegawai
						? +pegawai.organisasi.id
						: 0,
				namaOrganisasi: data
					? data.namaOrganisasi
					: pegawai
						? pegawai.organisasi.nama
						: "",
				jabatanId: data ? +data.jabatan.id : pegawai ? +pegawai.jabatan.id : 0,
				namaJabatan: data
					? data.namaJabatan
					: pegawai
						? pegawai.jabatan.nama
						: "",
				jenisSp: data?.jenisSp ?? "",
				nomorSp: data?.nomorSp ?? "",
				tanggalSp: data?.tanggalSp ?? "",
				tanggalMulai: data?.tanggalMulai ?? "",
				tanggalSelesai: data?.tanggalSelesai ?? "",
				penandaTangan: data?.penandaTangan ?? "",
				jabatanPenandaTangan: data?.jabatanPenandaTangan ?? "",
				notes: data?.notes ?? "",
			},
		}));
	},
	setJenisSp: (val?: JenisSp) => set({ jenisSp: val }),
}));