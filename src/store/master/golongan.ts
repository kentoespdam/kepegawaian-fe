import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface GolonganStore extends BaseSelectedStore, BaseDeleteStore {}

export const useGolonganStore = create<GolonganStore>((set) => ({
	selectedDataId: 0,
	setSelectedDataId: (val) => set({ selectedDataId: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
