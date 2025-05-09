import type {
	AlasanBerhenti,
	AlasanBerhentiSchema,
} from "@_types/master/alasan_berhenti";
import { create } from "zustand";

interface AlasanBerhentiStore {
	alasanTerminasi: AlasanBerhenti | null;
	setAlasanTerminasi: (val: AlasanBerhenti) => void;
	defaultValues: AlasanBerhentiSchema;
	setDefaultValues: (val?: AlasanBerhenti) => void;
}

export const useAlasanBerhentiStore = create<AlasanBerhentiStore>((set) => ({
	alasanTerminasi: null,
	setAlasanTerminasi: (val) => set({ alasanTerminasi: val }),
	defaultValues: {
		id: 0,
		nama: "",
		notes: "",
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				nama: val?.nama || "",
				notes: val?.notes || "",
			},
		})),
}));
