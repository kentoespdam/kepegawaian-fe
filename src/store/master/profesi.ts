import type { Profesi, ProfesiSchema } from "@_types/master/profesi";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface ProfesiStore extends BaseDeleteStore {
	profesiId: number;
	setProfesiId: (id: number) => void;
	defaultValues: ProfesiSchema;
	setDefaultValues: (val?: Profesi) => void;
}

export const useProfesiStore = create<ProfesiStore>((set) => ({
	profesiId: 0,
	setProfesiId: (id) => set({ profesiId: id }),
	defaultValues: {
		id: 0,
        organisasiId:0,
		jabatanId: 0,
		gradeId: 0,
		nama: "",
		detail: "",
		resiko: "",
	},
	setDefaultValues: (val) => {
		set({
			defaultValues: {
				id: val?.id || 0,
                organisasiId: val?.organisasi.id || 0,
				jabatanId: val?.jabatan.id || 0,
				gradeId: val?.grade.id || 0,
				nama: val?.nama || "",
				detail: val?.detail || "",
				resiko: val?.resiko || "",
			},
		});
	},
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
