import type { Apd, ApdSchema } from "@_types/master/apd";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface ApdStore extends BaseDeleteStore {
	apdId: number;
	setApdId: (val: number) => void;
	defaultValues: ApdSchema;
	setDefaultValues: (val?: { data?: Apd; profesiId?: number }) => void;
}

export const useApdStore = create<ApdStore>((set) => ({
	apdId: 0,
	setApdId: (val) => set({ apdId: val }),
	defaultValues: {
		id: 0,
		nama: "",
		profesiId: 0,
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.data?.id || 0,
				nama: val?.data?.nama || "",
				profesiId: val?.profesiId || 0,
			},
		})),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
