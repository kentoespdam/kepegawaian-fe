import type { GajiBatchMasterProsesSchema } from "@_types/penggajian/gaji_batch_master_proses";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface GajiBatchMasterProsesStore extends BaseDeleteStore {
	batchMasterId?: number;
	setBatchMasterId: (val?: number) => void;
	batchMasterProsesId: number;
	setBatchMasterProsesId: (val: number) => void;
	openForm: boolean;
	setOpenForm: (val: boolean) => void;
	defaultValues: GajiBatchMasterProsesSchema;
	setDefaultValues: (val?: GajiBatchMasterProsesSchema) => void;
}

export const useGajiBatchMasterProsesStore = create<GajiBatchMasterProsesStore>(
	(set) => ({
		setBatchMasterId: (val) => set({ batchMasterId: val }),
		batchMasterProsesId: 0,
		setBatchMasterProsesId: (val) => set({ batchMasterProsesId: val }),
		openForm: false,
		setOpenForm: (val) => set({ openForm: val }),
		openDelete: false,
		setOpenDelete: (val) => set({ openDelete: val }),
		defaultValues: {
			batchMasterId: 0,
			nama: "",
			jenisGaji: "",
			nilai: 0,
		},
		setDefaultValues: (val) => set({ defaultValues: val }),
	}),
);
