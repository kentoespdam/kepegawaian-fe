import type { RumahDinas, RumahDinasSchema } from "@_types/master/rumah_dinas";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface RumahDinasStore extends BaseDeleteStore {
	rumahDinasId: number;
	setRumahDinasId: (val: number) => void;
	defaultValues: RumahDinasSchema;
	setDefaultValues: (val?: RumahDinas) => void;
}

export const useRumahDinasStore = create<RumahDinasStore>((set) => ({
	rumahDinasId: 0,
	setRumahDinasId: (val) => set({ rumahDinasId: val }),
	defaultValues: {
		id: 0,
		nama: "",
		nilai: 0,
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				nama: val?.nama || "",
				nilai: val?.nilai || 0,
			},
		})),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
