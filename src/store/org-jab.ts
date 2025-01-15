import { create } from "zustand";

interface OrgJab {
	organisasiId?: number;
	setOrganisasiId: (val: number) => void;
	jabatanId?: number;
	setJabatanId: (val: number) => void;
}

export const useOrgJab = create<OrgJab>((set) => ({
	setOrganisasiId: (val: number) => set({ organisasiId: val }),
	setJabatanId: (val: number) => set({ jabatanId: val }),
}));
