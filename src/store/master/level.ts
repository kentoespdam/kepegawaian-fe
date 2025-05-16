import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface LevelStore extends BaseSelectedStore, BaseDeleteStore {}

export const useLevelStore = create<LevelStore>((set) => ({
    selectedDataId: 0,
    setSelectedDataId: (val) => set({ selectedDataId: val }),
    openDelete: false,
    setOpenDelete: (val) => set({ openDelete: val }),
}));
