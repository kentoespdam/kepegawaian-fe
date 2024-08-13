import { create } from "zustand";

interface DataPegawaiStore {
	tab: string;
	setTab: (tab: string) => void;
}

export const useDataPegawaiStore = create<DataPegawaiStore>((set) => ({
	tab: "pegawai",
	setTab: (tab: string) => set({ tab }),
}));
