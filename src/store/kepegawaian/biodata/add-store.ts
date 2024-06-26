import { create } from "zustand";

interface AddBiodataStore {
	referensi: string;
	setReferensi: (referensi: string) => void;
	organisasiId?: number;
	setOrganisasiId: (organisasiId: number) => void;
}

export const useAddBiodataStore = create<AddBiodataStore>((set) => ({
	referensi: "pegawai",
	setReferensi: (referensi) => set({ referensi }),
	setOrganisasiId: (organisasiId) => set({ organisasiId }),
}));
