import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface GradeStore extends BaseSelectedStore, BaseDeleteStore {}

export const useGradeStore = create<GradeStore>((set) => ({
	selectedDataId: 0,
	setSelectedDataId: (val) => set({ selectedDataId: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
