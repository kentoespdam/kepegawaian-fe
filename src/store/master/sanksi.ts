import type { BaseDeleteStore } from "@store/base-store";
import type { Sanksi, SanksiSchema } from "@_types/master/sanksi";
import { create } from "zustand";
interface SanksiStore extends BaseDeleteStore {
	sanksiId: number;
	setSanksiId: (val: number) => void;
	jenisSpId: number;
	setJenisSpId: (val: number) => void;
	defaultValues: SanksiSchema;
	setDefaultValues: (val?: Sanksi) => void;
	openSanksiForm: boolean;
	setOpenSanksiForm: (val: boolean) => void;
}

export const useSanksiStore = create<SanksiStore>((set) => ({
	sanksiId: 0,
	setSanksiId: (val) => set({ sanksiId: val }),
	jenisSpId: 0,
	setJenisSpId: (val) => set({ jenisSpId: val }),
	defaultValues: {} as SanksiSchema,
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				jenisSpId: state.jenisSpId > 0 ? state.jenisSpId : val?.jenisSpId || 0,
				kode: val?.kode || "",
				keterangan: val?.keterangan || "",
				potTkk: val?.potTkk || false,
				jmlPotTkk: val?.jmlPotTkk || 0,
				isPendingPangkat: val?.isPendingPangkat || false,
				isPendingGaji: val?.isPendingGaji || false,
				isTurunPangkat: val?.isTurunPangkat || false,
				isTurunJabatan: val?.isTurunJabatan || false,
				isSuspension: val?.isSuspension || false,
				isTerminateDh: val?.isTerminateDh || false,
				isTerminateTh: val?.isTerminateTh || false,
			},
		})),
	openSanksiForm: false,
	setOpenSanksiForm: (val) => set({ openSanksiForm: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
