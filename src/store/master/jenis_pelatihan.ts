import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface JenisPelatihanStore extends BaseSelectedStore, BaseDeleteStore {}

export const useJenisPelatihanStore = create<JenisPelatihanStore>((set) => ({
	selectedDataId: 0,
	setSelectedDataId: (val) => set({ selectedDataId: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
