import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface JenisKitasStore extends BaseSelectedStore, BaseDeleteStore {}

export const useJenisKitasStore = create<JenisKitasStore>((set) => ({
    selectedDataId: 0,
    setSelectedDataId: (val) => set({ selectedDataId: val }),
    openDelete: false,
    setOpenDelete: (val) => set({ openDelete: val }),
}));
