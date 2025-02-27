import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface GajiBatchMasterProsesStore extends BaseDeleteStore {
	batchMasterId?: number;
	setBatchMasterId: (val?: number) => void;
	openForm: boolean;
	setOpenForm: (val: boolean) => void;
}

export const useGajiBatchMasterProsesStore = create<GajiBatchMasterProsesStore>(
	(set) => ({
		setBatchMasterId: (val) => set({ batchMasterId: val }),
		openForm: false,
		setOpenForm: (val) => set({ openForm: val }),
		openDelete: false,
		setOpenDelete: (val) => set({ openDelete: val }),
	}),
);
