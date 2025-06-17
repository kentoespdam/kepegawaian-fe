import type { PegawaiDetail, ProfilPribadiSchema } from "@_types/pegawai";
import { create } from "zustand";

interface ProfilPribadiStore {
	defaultValues: ProfilPribadiSchema;
	setDefaultValues: (val?: PegawaiDetail) => void;
	pegawai?: PegawaiDetail;
	setPegawaiId: (val: PegawaiDetail) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
}

export const useProfilPribadiStore = create<ProfilPribadiStore>((set) => ({
	defaultValues: {
		id: 0,
		nipam: "",
		nama: "",
		jenisKelamin: "",
		statusKawin: "",
		agama: "",
		tempatLahir: "",
		tanggalLahir: "",
		alamat: "",
		ibuKandung: "",
		telp: "",
		golonganId: 0,
		organisasiId: 0,
		jabatanId: 0,
		absensiId: 0,
	},
	setDefaultValues: (val?: PegawaiDetail) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id ?? 0,
				nipam: val?.nipam ?? "",
				nama: val?.biodata.nama ?? "",
				jenisKelamin: val?.biodata.jenisKelamin ?? "",
				statusKawin: val?.biodata.statusKawin ?? "",
				agama: val?.biodata.agama ?? "",
				tempatLahir: val?.biodata.tempatLahir ?? "",
				tanggalLahir: val?.biodata.tanggalLahir ?? "",
				alamat: val?.biodata.alamat ?? "",
				ibuKandung: val?.biodata.ibuKandung ?? "",
				telp: val?.biodata.telp ?? "",
				golonganId: val?.golongan?.id ?? 0,
				organisasiId: val?.organisasi?.id ?? 0,
				jabatanId: val?.jabatan?.id ?? 0,
				profesiId: val?.profesi?.id,
				absensiId: val?.absensiId ?? 0,
			},
		})),
	setPegawaiId: (val) =>
		set((state) => ({
			...state,
			pegawai: val,
		})),
	open: false,
	setOpen: (val) =>
		set((state) => ({
			...state,
			open: val,
		})),
}));
