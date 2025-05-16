import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface GajiBatchRootStore extends BaseDeleteStore {
	batchId: string;
	setBatchId: (val: string) => void;
	addOpen: boolean;
	setAddOpen: (val: boolean) => void;
}

export const useGajiBatchRootStore = create<GajiBatchRootStore>((set) => ({
	batchId: "",
	setBatchId: (val) => set({ batchId: val }),
	addOpen: false,
	setAddOpen: (val) => set({ addOpen: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
