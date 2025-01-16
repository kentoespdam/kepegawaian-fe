import type { Jabatan, JabatanSchema } from "@_types/master/jabatan";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface JabatanStore extends BaseDeleteStore {
	jabatanId: number;
	setJabatanId: (jabatanId: number) => void;
	defaultValues: JabatanSchema;
	setDefaultValues: (val?: Jabatan) => void;
}

export const useJabatanStore = create<JabatanStore>((set) => ({
	jabatanId: 0,
	setJabatanId: (jabatanId: number) => set({ jabatanId }),
	defaultValues: {
		id: 0,
		kode: "",
		organisasiId: 0,
		levelId: 0,
		nama: "",
	},
	setDefaultValues: (val?: Jabatan) => {
		set({
			defaultValues: {
				id: val?.id ?? 0,
				kode: val?.kode ?? "",
				organisasiId: val?.organisasi?.id ?? 0,
				parentId: val?.parent?.id ?? 0,
				levelId: val?.level?.id ?? 0,
				nama: val?.nama ?? "",
			},
		});
	},
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
