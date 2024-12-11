import { ProfilGajiSchema, type ProfilGaji } from "@_types/penggajian/profil";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface ProfilGajiStore extends BaseDeleteStore {
	profilGajiId: number;
	setProfilGajiId: (val: number) => void;
	defaultValues: ProfilGajiSchema;
	setDefaultValues: (val?: ProfilGaji) => void;
	showForm: boolean;
	setShowForm: (val: boolean) => void;
}

export const useProfilGajiStore = create<ProfilGajiStore>((set) => ({
	profilGajiId: 0,
	setProfilGajiId: (id) => set({ profilGajiId: id }),
	defaultValues: {
		id: 0,
		nama: "",
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: ProfilGajiSchema.parse(val),
		})),
	showForm: false,
	setShowForm: (val) => set({ showForm: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
