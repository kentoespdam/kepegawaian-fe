import type { Biodata } from "@_types/profil/biodata";
import type { Keahlian, KeahlianSchema } from "@_types/profil/keahlian";
import { create } from "zustand";

interface KeahlianStore {
	keahlianId: number;
	setKeahlianId: (val: number) => void;
	selectedKeahlianId: number;
	setSelectedKeahlianId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
	defaultValues: KeahlianSchema;
	setDefaultValues: (biodata: Biodata, keahlian?: Keahlian) => void;
}

export const useKeahlianStore = create<KeahlianStore>((set) => ({
	keahlianId: 0,
	setKeahlianId: (val) => set({ keahlianId: val }),
	selectedKeahlianId: 0,
	setSelectedKeahlianId: (val) => set({ selectedKeahlianId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		biodataId: "",
		keahlianId: 0,
		kualifikasi: "baik",
		sertifikasi: false,
		institusi: "",
		tahun: 0,
		masaBerlaku: "",
	},
	setDefaultValues: (biodata, keahlian) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: keahlian?.id || 0,
				biodataId: biodata.nik || "",
				keahlianId: keahlian?.jenisKeahlian.id || 0,
				kualifikasi: keahlian?.kualifikasi || "baik",
				sertifikasi: keahlian?.sertifikasi || false,
				institusi: keahlian?.institusi || "",
				tahun: keahlian?.tahun || 0,
				masaBerlaku: keahlian?.masaBerlaku || "",
			},
		})),
}));
