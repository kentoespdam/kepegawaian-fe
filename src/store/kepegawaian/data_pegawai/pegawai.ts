import { JenisKelamin } from "@_types/enums/jenisKelamin";
import type { PegawaiDetail, PegawaiSchema } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import { create } from "zustand";

interface PegawaiStore {
	defaultValues: PegawaiSchema;
	setDefaultValues: (pegawai?: PegawaiDetail, biodata?: Biodata) => void;
}

export const usePegawaiStore = create<PegawaiStore>((set) => ({
	defaultValues: {
		statusPegawai: "PEGAWAI",
		nik: "",
		nama: "",
		jenisKelamin: JenisKelamin.Values.LAKI_LAKI,
		golonganDarah: "",
		statusKawin: "",
		agama: "",
		tempatLahir: "",
		tanggalLahir: "",
		ibuKandung: "",
		telp: "",
		pendidikanTerakhirId: 0,
		alamat: "",
		notes: "",
		nipam: "",
		statusKerja: "",
		organisasiId: 0,
		jabatanId: 0,
		profesiId: 0,
		kodePajakId: 0,
		golonganId: 0,
		nomorSk: "",
		tanggalSk: "",
		tmtKontrakSelesai: "",
		gajiPokok: 0,
	},
	setDefaultValues: (pegawai, biodata) =>
		set((state) => ({
			...state,
			defaultValues: {
				statusPegawai: pegawai?.statusPegawai ?? "PEGAWAI",
				nik: biodata?.nik ?? "",
				nama: biodata?.nama ?? "",
				jenisKelamin: biodata?.jenisKelamin ?? JenisKelamin.Values.LAKI_LAKI,
				golonganDarah: biodata?.golonganDarah ?? "",
				statusKawin: biodata?.statusKawin ?? "",
				agama: biodata?.agama ?? "",
				tempatLahir: biodata?.tempatLahir ?? "",
				tanggalLahir: biodata?.tanggalLahir ?? "",
				ibuKandung: biodata?.ibuKandung ?? "",
				telp: biodata?.telp ?? "",
				pendidikanTerakhirId: biodata?.pendidikanTerakhir.id ?? 0,
				alamat: biodata?.alamat ?? "",
				notes: biodata?.notes ?? "",
				nipam: pegawai?.nipam ?? "",
				statusKerja: pegawai?.statusKerja ?? "",
				organisasiId: pegawai?.organisasi.id ?? 0,
				jabatanId: pegawai?.jabatan.id ?? 0,
				profesiId: pegawai?.profesi.id ?? 0,
				kodePajakId: pegawai?.kodePajak?.id ?? 0,
				golonganId: pegawai?.golongan.id ?? 0,
				nomorSk: pegawai?.nomorSk ?? "",
				tanggalSk: pegawai?.tanggalSk ?? "",
				tmtKontrakSelesai: pegawai?.tmtKontrakSelesai ?? "",
				gajiPokok: pegawai?.gajiPokok ?? 0,
			},
		})),
}));
