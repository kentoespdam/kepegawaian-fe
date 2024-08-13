import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import { create } from "zustand";

interface LampiranProfilStore {
	lampiranId: number;
	setLampiranId: (val: number) => void;
	ref: JenisLampiranProfil;
	setRef: (val: JenisLampiranProfil) => void;
	refId: number;
	setRefId: (val: number) => void;
	nik: string;
	setNik: (val: string) => void;
	openLampiranForm: boolean;
	setOpenLampiranForm: (val: boolean) => void;
	openDeleteDialog: boolean;
	setOpenDeleteDialog: (val: boolean) => void;
	openLampiran: boolean;
	setOpenLampiran: (val: boolean) => void;
}

export const useLampiranProfilStore = create<LampiranProfilStore>((set) => ({
	lampiranId: 0,
	setLampiranId: (val) => set({ lampiranId: val }),
	ref: JenisLampiranProfil.Values.PROFIL_PENDIDIKAN,
	setRef: (val) => set({ ref: val }),
	refId: 0,
	setRefId: (val) => set({ refId: val }),
	nik: "",
	setNik: (val) => set({ nik: val }),
	openLampiranForm: false,
	setOpenLampiranForm: (val) => set({ openLampiranForm: val }),
	openDeleteDialog: false,
	setOpenDeleteDialog: (val) => set({ openDeleteDialog: val }),
	openLampiran: false,
	setOpenLampiran: (val) => set({ openLampiran: val }),
}));
