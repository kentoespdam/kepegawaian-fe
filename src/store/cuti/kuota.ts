import type {
	CutiKuota,
	CutiKuotaImportSchema,
	CutiKuotaSchema,
} from "@_types/cuti/kuota";
import type { PegawaiList } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface CutiKuotaStore extends SelectedHandlerStore {
	defaultValue: CutiKuotaSchema;
	setDefaultValue: (
		tahun: number,
		pegawai?: PegawaiList,
		val?: CutiKuota,
	) => void;
	openBatch: boolean;
	setOpenBatch: (open: boolean) => void;
}

const now = new Date();

export const useCutiKuotaStore = create<CutiKuotaStore>((set) => ({
	defaultValue: {
		id: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		statusPegawai: "",
		jabatan: "",
		tahun: 0,
		kuota: 12,
		kuotaTambahan: 0,
		sisaKuota: 12,
		expired: "",
	},
	setDefaultValue: (tahun, pegawai, val) => {
		return set((state) => ({
			...state,
			defaultValue: {
				id: val?.id ?? 0,
				pegawaiId: pegawai ? pegawai.id : (val?.pegawai?.id ?? 0),
				nipam: pegawai ? pegawai.nipam : (val?.pegawai.nipam ?? ""),
				nama: pegawai ? pegawai.nama : (val?.pegawai.nama ?? ""),
				statusPegawai: pegawai
					? pegawai.statusPegawai
					: (val?.pegawai.statusPegawai ?? ""),
				jabatan: pegawai ? pegawai.jabatan.nama : (val?.pegawai.jabatan ?? ""),
				tahun: val?.tahun ?? tahun,
				kuota: val?.kuota ?? 12,
				kuotaTambahan: val?.kuotaTambahan ?? 0,
				sisaKuota: val?.sisaKuota ?? 12,
				expired: val?.expired ?? `${tahun + 1}-06-30`,
			},
		}));
	},
	selectedDataId: 0,
	setSelectedDataId: (id: number) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val: boolean) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val: boolean) => set({ openDelete: val }),
	openBatch: false,
	setOpenBatch: (val: boolean) => set({ openBatch: val }),
}));
