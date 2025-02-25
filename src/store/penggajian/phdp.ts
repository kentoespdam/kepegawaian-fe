import type { Phdp, PhdpSchema } from "@_types/penggajian/phdp";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface PhpdStore extends BaseDeleteStore {
	phdpId: number;
	setPhdpId: (id: number) => void;
	defaultValues: PhdpSchema;
	setDefaultValues: (val?: Phdp) => void;
}

export const usePhdpStore = create<PhpdStore>((set) => ({
	phdpId: 0,
	setPhdpId: (id) => set({ phdpId: id }),
	defaultValues: {
		id: 0,
		urut: 1,
		kondisi: "",
		formula: "",
	},
	setDefaultValues: (val) =>
		set((store) => ({
			...store,
			defaultValues: {
				id: val?.id || 0,
				urut: val?.urut || 1,
				kondisi: val?.kondisi || "",
				formula: val?.formula || "",
			},
		})),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
