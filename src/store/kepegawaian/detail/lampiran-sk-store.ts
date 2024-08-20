import { create } from "zustand";

interface LampiranSkStore {
	lampiranId: number;
	setLampiranId: (val: number) => void;
	ref: string;
	setRef: (val: string) => void;
	refId: number;
	setRefId: (val: number) => void;
	openLampiranForm: boolean;
	setOpenLampiranForm: (val: boolean) => void;
	openDeleteLampiranForm: boolean;
	setOpenDeleteLampiranForm: (val: boolean) => void;
}

export const useLampiranSkStore = create<LampiranSkStore>((set) => ({
	lampiranId: 0,
	setLampiranId: (val) => set({ lampiranId: val }),
	ref: "",
	setRef: (val) => set({ ref: val }),
	refId: 0,
	setRefId: (val) => set({ refId: val }),
	openLampiranForm: false,
	setOpenLampiranForm: (val) => set({ openLampiranForm: val }),
	openDeleteLampiranForm: false,
	setOpenDeleteLampiranForm: (val) => set({ openDeleteLampiranForm: val }),
}));
