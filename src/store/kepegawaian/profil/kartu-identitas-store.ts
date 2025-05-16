import type { Biodata } from "@_types/profil/biodata";
import type {
	KartuIdentitas,
	KartuIdentitasSchema,
} from "@_types/profil/kartu_identitas";
import { create } from "zustand";

interface KartuIdentitasStore {
	kartuIdentitasId: number;
	setKartuIdentitasId: (val: number) => void;
	selectedKartuIdentitasId: number;
	setSelectedKartuIdentitasId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
	defaultValues: KartuIdentitasSchema;
	setDefaultValues: (biodata: Biodata, kartuIdentitas?: KartuIdentitas) => void;
}

export const useKartuIdentitasStore = create<KartuIdentitasStore>((set) => ({
	kartuIdentitasId: 0,
	setKartuIdentitasId: (val) => set({ kartuIdentitasId: val }),
	selectedKartuIdentitasId: 0,
	setSelectedKartuIdentitasId: (val) => set({ selectedKartuIdentitasId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		nik: "",
		jenisKartuId: 0,
		nomorKartu: "",
		tanggalExpired: "",
		tanggalTerima: "",
		notes: "",
	},
	setDefaultValues: (biodata, kartuIdentitas) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: kartuIdentitas?.id || 0,
				nik: biodata.nik || "",
				jenisKartuId: kartuIdentitas?.jenisKartu.id || 0,
				nomorKartu: kartuIdentitas?.nomorKartu || "",
				tanggalExpired: kartuIdentitas?.tanggalExpired || "",
				tanggalTerima: kartuIdentitas?.tanggalTerima || "",
				notes: kartuIdentitas?.notes || "",
			},
		})),
}));
