import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface GajiBatchMasterProsesStore extends BaseDeleteStore {
	batchMasterId?: number;
	setBatchMasterId: (val?: number) => void;
}

export const useGajiBatchMasterProsesStore = create<GajiBatchMasterProsesStore>(
	(set) => ({
		setBatchMasterId: (val) => set({ batchMasterId: val }),
		openDelete: false,
		setOpenDelete: (val) => set({ openDelete: val }),
	}),
);
