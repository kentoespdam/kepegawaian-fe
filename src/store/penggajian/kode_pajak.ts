import type {
	PendapatanNonPajak,
	PendapatanNonPajakSchema,
} from "@_types/penggajian/pendapatan_non_pajak";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface KodePajakStore extends BaseDeleteStore {
	kodePajakId: number;
	setKodePajakId: (val: number) => void;
	defaultValues: PendapatanNonPajakSchema;
	setDefaultValues: (val?: PendapatanNonPajak, isUpdate?: boolean) => void;
}

export const useKodePajakStore = create<KodePajakStore>((set) => ({
	kodePajakId: 0,
	setKodePajakId: (val) => set({ kodePajakId: val }),
	defaultValues: {
		id: 0,
		kode: "",
		nominal: 0,
		notes: "",
		isUpdate: false,
	},
	setDefaultValues: (val, isUpdate) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				kode: val?.kode || "",
				nominal: val?.nominal || 0,
				notes: val?.notes || "",
				isUpdate: isUpdate || false,
			},
		})),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
