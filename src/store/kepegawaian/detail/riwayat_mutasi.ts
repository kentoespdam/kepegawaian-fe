import type {
	RiwayatMutasi,
	RiwayatMutasiSchema,
} from "@_types/kepegawaian/riwayat-mutasi";
import type { JenisMutasi } from "@_types/master/jenis_mutasi";
import type { Pegawai } from "@_types/pegawai";
import type { Golongan } from "@src/types/master/golongan";
import type { JabatanMini } from "@src/types/master/jabatan";
import type { OrganisasiMini } from "@src/types/master/organisasi";
import type { ProfesiMini } from "@src/types/master/profesi";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface RiwayatMutasiStore extends SelectedHandlerStore {
	riwayatMutasiId: number;
	setRiwayatMutasiId: (id: number) => void;
	defaultValues: RiwayatMutasiSchema;
	setDefaultValues: (
		pegawai?: Pegawai,
		riwayatMutasi?: RiwayatMutasi,
		organisasi?: OrganisasiMini,
		jabatan?: JabatanMini,
		profesi?: ProfesiMini,
		golongan?: Golongan,
	) => void;
	jenisMutasi?: JenisMutasi;
	setJenisMutasi: (val?: JenisMutasi) => void;
}

export const useRiwayatMutasiStore = create<RiwayatMutasiStore>((set) => ({
	riwayatMutasiId: 0,
	setRiwayatMutasiId: (id) => set({ riwayatMutasiId: id }),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		nomorSk: "",
		jenisSk: "SK_MUTASI",
		tanggalSk: "",
		tmtBerlaku: "",
		golonganId: 0,
		gajiPokok: 0,
		mkgTahun: 0,
		mkgBulan: 0,
		kenaikanBerikutnya: "",
		mkgbTahun: 0,
		mkgbBulan: 0,
		updateMaster: false,
		tanggalBerakhir: "",
		jenisMutasi: "",
		organisasiId: 0,
		jabatanId: 0,
		profesiId: 0,
		golonganLamaId: 0,
		namaGolonganLama: "",
		organisasiLamaId: 0,
		namaOrganisasiLama: "",
		jabatanLamaId: 0,
		namaJabatanLama: "",
		profesiLamaId: 0,
		namaProfesiLama: "",
		notes: "",
	},
	setDefaultValues: (
		pegawai,
		riwayatMutasi,
		organisasi,
		jabatan,
		profesi,
		golongan,
	) => {
		return set((state) => ({
			...state,
			defaultValues: {
				id: riwayatMutasi ? +riwayatMutasi.id : 0,
				pegawaiId: pegawai ? +pegawai.id : 0,
				nipam: pegawai?.nipam ?? "",
				nama: pegawai?.biodata.nama ?? "",
				nomorSk: riwayatMutasi?.skMutasi?.nomorSk ?? "",
				jenisSk: riwayatMutasi?.skMutasi?.jenisSk ?? "SK_MUTASI",
				tanggalSk: riwayatMutasi?.skMutasi?.tanggalSk ?? "",
				tmtBerlaku: riwayatMutasi?.skMutasi?.tmtBerlaku ?? "",
				gajiPokok: riwayatMutasi?.skMutasi?.gajiPokok ?? 0,
				mkgTahun: riwayatMutasi?.skMutasi?.mkgTahun ?? 0,
				mkgBulan: riwayatMutasi?.skMutasi?.mkgBulan ?? 0,
				kenaikanBerikutnya: riwayatMutasi?.skMutasi?.kenaikanBerikutnya ?? "",
				mkgbTahun: riwayatMutasi?.skMutasi?.mkgbTahun ?? 0,
				mkgbBulan: riwayatMutasi?.skMutasi?.mkgbBulan ?? 0,
				updateMaster: riwayatMutasi?.skMutasi?.updateMaster ?? false,
				tanggalBerakhir: riwayatMutasi?.tanggalBerakhir ?? "",
				jenisMutasi: riwayatMutasi?.jenisMutasi ?? "",
				golonganLamaId: riwayatMutasi?.golonganLama?.id ?? 0,
				namaGolonganLama: `${riwayatMutasi?.golonganLama?.golongan ?? ""} - ${riwayatMutasi?.golonganLama?.pangkat ?? ""}`,
				organisasiLamaId: riwayatMutasi?.organisasiLama?.id ?? 0,
				namaOrganisasiLama: organisasi?.nama ?? "",
				jabatanLamaId: riwayatMutasi?.jabatanLama?.id ?? 0,
				namaJabatanLama: riwayatMutasi?.namaJabatanLama ?? "",
				profesiLamaId: riwayatMutasi?.profesiLama?.id ?? 0,
				namaProfesiLama: riwayatMutasi?.namaProfesiLama ?? "",
				golonganId: riwayatMutasi?.skMutasi?.golongan
					? riwayatMutasi.skMutasi.golongan.id
					: 0,
				organisasiId: riwayatMutasi?.organisasi
					? riwayatMutasi.organisasi.id
					: 0,
				jabatanId: riwayatMutasi?.jabatan ? +riwayatMutasi.jabatan.id : 0,
				jabatan: riwayatMutasi?.jabatan ?? undefined,
				profesiId: pegawai ? (pegawai.profesi ? +pegawai.profesi.id : 0) : 0,
				notes: riwayatMutasi?.notes ?? "",
			},
		}));
	},
	setJenisMutasi: (val) => set({ jenisMutasi: val }),
}));
