import type {
	KomponenGaji,
	KomponenGajiSchema,
} from "@_types/penggajian/komponen";
import type { ProfilGaji } from "@_types/penggajian/profil";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface KomponenGajiStore extends BaseDeleteStore {
	komponenGajiId: number;
	setKomponenGajiId: (val: number) => void;
	defaultValues: KomponenGajiSchema;
	setDefaultValues: ({
		profilGaji,
		val,
		urut,
	}: { profilGaji: ProfilGaji; val?: KomponenGaji; urut?: number }) => void;
	setUrut: (val: number) => void;
}

export const useKomponenGajiStore = create<KomponenGajiStore>((set) => ({
	komponenGajiId: 0,
	setKomponenGajiId: (val) => set({ komponenGajiId: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		urut: 1,
		profilGajiId: 0,
		profilGajiName: "",
		kode: "",
		nama: "",
		jenisGaji: "NONE",
		nilai: 0,
		isReference: false,
		formula: "",
	},
	setDefaultValues: ({ profilGaji, val, urut }) =>
		set((store) => ({
			...store,
			defaultValues: {
				id: val?.id || 0,
				urut: val?.urut ?? urut ?? 1,
				profilGajiId: profilGaji.id,
				profilGajiName: profilGaji.nama,
				kode: val?.kode || "",
				nama: val?.nama || "",
				jenisGaji: val?.jenisGaji || "NONE",
				nilai: val?.nilai || 0,
				isReference: val?.isReference || false,
				formula: val?.formula || "",
			},
		})),
	setUrut: (val) =>
		set((store) => ({
			...store,
			defaultValues: {
				...store.defaultValues,
				urut: val,
			},
		})),
}));
