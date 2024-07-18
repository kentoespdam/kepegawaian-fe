import { findAgamaIndex } from "@_types/enums/agama";
import { findHubunganKeluargaIndex } from "@_types/enums/hubungan-keluarga";
import { findJenisKelaminIndex } from "@_types/enums/jenisKelamin";
import { findStatusKawinIndex } from "@_types/enums/status_kawin";
import type { Biodata } from "@_types/profil/biodata";
import type { Keluarga, KeluargaSchema } from "@_types/profil/keluarga";
import { create } from "zustand";

interface KeluargaStore {
	keluargaId: number;
	setKeluargaId: (val: number) => void;
	selectedKeluargaId: number;
	setSelectedKeluargaId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
	defaultValues: KeluargaSchema;
	setDefaultValues: (biodata: Biodata, keluarga?: Keluarga) => void;
}

export const useKeluargaStore = create<KeluargaStore>((set) => ({
	keluargaId: 0,
	setKeluargaId: (val) => set({ keluargaId: val }),
	selectedKeluargaId: 0,
	setSelectedKeluargaId: (val) => set({ selectedKeluargaId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		biodataId: "",
		nik: "",
		nama: "",
		jenisKelamin: 1,
		hubunganKeluarga: 0,
		agama: 0,
		tempatLahir: "",
		tanggalLahir: "",
		tanggungan: true,
		pendidikanId: 0,
		statusKawin: 0,
		notes: "",
	},
	setDefaultValues: (biodata, keluarga) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: keluarga?.id || 0,
				biodataId: biodata.nik || "",
				nik: keluarga?.nik || "",
				nama: keluarga?.nama || "",
				jenisKelamin: findJenisKelaminIndex(keluarga?.jenisKelamin) || 1,
				hubunganKeluarga:
					findHubunganKeluargaIndex(keluarga?.hubunganKeluarga) || 0,
				agama: findAgamaIndex(keluarga?.agama) || 0,
				tempatLahir: keluarga?.tempatLahir || "",
				tanggalLahir: keluarga?.tanggalLahir || "",
				tanggungan: keluarga?.tanggungan || true,
				pendidikanId: keluarga?.pendidikan.id || 0,
				statusKawin: findStatusKawinIndex(keluarga?.statusKawin) || 0,
				notes: keluarga?.notes || "",
			},
		})),
}));
