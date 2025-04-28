import { HubunganKeluarga } from "@_types/enums/hubungan-keluarga";
import { JenisKelamin } from "@_types/enums/jenisKelamin";
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
		jenisKelamin: JenisKelamin.Values.LAKI_LAKI,
		hubunganKeluarga: HubunganKeluarga.Values.ANAK,
		agama: "ISLAM",
		tempatLahir: "",
		tanggalLahir: "",
		tanggungan: true,
		pendidikanId: 0,
		statusPendidikan: "SEKOLAH",
		statusKawin: "BELUM_KAWIN",
		notes: "",
	},
	setDefaultValues: (biodata, keluarga) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: keluarga?.id ?? 0,
				biodataId: biodata.nik ?? "",
				nik: keluarga?.nik ?? "",
				nama: keluarga?.nama ?? "",
				jenisKelamin: keluarga?.jenisKelamin ?? JenisKelamin.Values.LAKI_LAKI,
				hubunganKeluarga:
					keluarga?.hubunganKeluarga ?? HubunganKeluarga.Values.ANAK,
				agama: keluarga?.agama ?? "ISLAM",
				tempatLahir: keluarga?.tempatLahir ?? "",
				tanggalLahir: keluarga?.tanggalLahir ?? "",
				tanggungan: keluarga?.tanggungan ?? true,
				pendidikanId: keluarga?.pendidikan?.id ?? 0,
				statusPendidikan: keluarga?.statusPendidikan ?? "SEKOLAH",
				statusKawin: keluarga?.statusKawin ?? "BELUM_KAWIN",
				notes: keluarga?.notes ?? "",
			},
		})),
}));
