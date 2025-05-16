import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface JenisKeahlianStore extends BaseSelectedStore, BaseDeleteStore {}

export const useJenisKeahlianStore = create<JenisKeahlianStore>((set) => ({
    selectedDataId: 0,
    setSelectedDataId: (val) => set({ selectedDataId: val }),
    openDelete: false,
    setOpenDelete: (val) => set({ openDelete: val }),
}));
