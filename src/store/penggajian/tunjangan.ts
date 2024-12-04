import type { Tunjangan, TunjanganSchema } from "@_types/penggajian/tunjangan";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface TunjanganStore extends BaseDeleteStore {
	tunjanganId: number;
	setTunjanganId: (val: number) => void;
	defaultValues: TunjanganSchema;
	setDefaultValues: (jenisTunjangan: string, val?: Tunjangan) => void;
}

export const useTunjanganStore = create<TunjanganStore>((set) => ({
	tunjanganId: 0,
	setTunjanganId: (val: number) => set({ tunjanganId: val }),
	defaultValues: {
		id: 0,
		jenisTunjangan: "JABATAN",
		levelId: 0,
		golonganId: 0,
		nominal: 0,
	},
	setDefaultValues: (jenisTunjangan, val) => {
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				jenisTunjangan: val?.jenisTunjangan || jenisTunjangan,
				levelId: val?.level.id || 0,
				golonganId: val?.golongan?.id || 0,
				nominal: val?.nominal || 0,
			},
		}));
	},
	openDelete: false,
	setOpenDelete: (val: boolean) => set({ openDelete: val }),
}));
