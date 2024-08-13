import { create } from "zustand";

interface AddBiodataStore {
	statusPegawai: string;
	setStatusPegawai: (referensi: string) => void;
	organisasiId?: number;
	setOrganisasiId: (organisasiId: number) => void;
}

export const useAddBiodataStore = create<AddBiodataStore>((set) => ({
	statusPegawai: "PEGAWAI",
	setStatusPegawai: (referensi) => set({ statusPegawai: referensi }),
	setOrganisasiId: (organisasiId) => set({ organisasiId }),
}));
