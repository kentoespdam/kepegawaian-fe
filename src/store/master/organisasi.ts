import type { Organisasi, OrganisasiSchema } from "@_types/master/organisasi";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface OrganisasiStore extends BaseDeleteStore {
	organisasiId: number;
	setOrganisasiId: (organisasiId: number) => void;
	defaultValues: OrganisasiSchema;
	setDefaultValues: (val?: Organisasi) => void;
}

export const useOrganisasiStore = create<OrganisasiStore>((set) => ({
	organisasiId: 0,
	setOrganisasiId: (organisasiId) => set({ organisasiId }),
	defaultValues: {
		id: 0,
		kode: "",
		parentId: 0,
		levelOrganisasi: 1,
		nama: "",
	},
	setDefaultValues: (val) => {
		set({
			defaultValues: {
				id: val?.id ?? 0,
				kode: val?.kode ?? "",
				parentId: val?.parent?.id ?? 0,
				levelOrganisasi: val?.levelOrganisasi ?? 1,
				nama: val?.nama ?? "",
			},
		});
	},
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
