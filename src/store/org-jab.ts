import { create } from "zustand";

interface OrgJab {
	organisasiId?: number;
	setOrganisasiId: (val: number) => void;
	jabLevelId?: number;
	setJabLevelId: (val: number) => void;
}

export const useOrgJab = create<OrgJab>((set) => ({
	setOrganisasiId: (val: number) => set({ organisasiId: val }),
	setJabLevelId: (val: number) => set({ jabLevelId: val }),
}));
