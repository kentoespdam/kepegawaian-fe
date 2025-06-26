import type { CutiJenis, CutiJenisSchema } from "@_types/cuti/jenis";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface CutiJenisStore extends SelectedHandlerStore {
	defaultValues: CutiJenisSchema;
	setDefaultValues: (val: CutiJenis) => void;
}

export const useCutiJenisStore = create<CutiJenisStore>((set) => ({
	defaultValues: {
		id: 0,
		parentId: 0,
		nama: "",
		maxHari: 0,
		potongKuotaTahunan: false,
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val.id ?? 0,
				parentId: val.parent?.id ?? 0,
				nama: val.nama,
				maxHari: val.maxHari ?? 0,
				potongKuotaTahunan: val.potongKuotaTahunan ?? false,
			},
		})),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
