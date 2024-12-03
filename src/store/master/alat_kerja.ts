import type { AlatKerja, AlatKerjaSchema } from "@_types/master/alat_kerja";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface AlatKerjaStore extends BaseDeleteStore {
	alatKerjaId: number;
	setAlatKerjaId: (val: number) => void;
	defaultValues: AlatKerjaSchema;
	setDefaultValues: (val?: { data?: AlatKerja; profesiId?: number }) => void;
}

export const useAlatKerjaStore = create<AlatKerjaStore>((set) => ({
	alatKerjaId: 0,
	setAlatKerjaId: (val) => set({ alatKerjaId: val }),
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
