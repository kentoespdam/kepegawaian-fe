import { create } from "zustand";

interface AddBiodataStore {
	referensi: string;
	setReferensi: (referensi: string) => void;
}

export const useAddBiodataStore = create<AddBiodataStore>((set) => ({
	referensi: "biodata",
	setReferensi: (referensi) => set({ referensi }),
}));
