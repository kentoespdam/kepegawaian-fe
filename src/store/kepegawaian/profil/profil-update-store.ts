import type { ProfilUpdate, ProfilUpdateSchema } from "@_types/profil/profil-update";
import { create } from "zustand";

interface ProfilUpdateStore {
	profilUpdate?: ProfilUpdate;
	setProfilUpdate: (val: ProfilUpdate) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	defaultValues: ProfilUpdateSchema;
	setDefaultValues: (id: number, pegawaiId: number) => void;
}

export const useProfilUpdateStore = create<ProfilUpdateStore>((set) => ({
	setProfilUpdate: (val) => set({ profilUpdate: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	defaultValues: {
		id: 0,
		approval: "REJECTED",
		pegawaiId: 0,
	},
	setDefaultValues: (id, pegawaiId) =>
		set((state) => ({
			...state,
			defaultValues: {
				...state.defaultValues,
				id: id,
				pegawaiId: pegawaiId,
			},
		})),
}));