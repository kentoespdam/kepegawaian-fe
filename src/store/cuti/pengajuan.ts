import type {
	BatalCutiPegawaiSchema,
	CutiPegawai,
	CutiPegawaiSchema,
	KlaimCutiPegawaiSchema,
} from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface PengajuanCutiStore extends SelectedHandlerStore {
	defaultValue: CutiPegawaiSchema;
	setDefaultValue: (pegawai: PegawaiDetail, value?: CutiPegawai) => void;
	setPegawaiValue: (pegawai: PegawaiDetail) => void;
	cutiPegawai?: CutiPegawai;
	setCutiPegawai: (cutiPegawai: CutiPegawai) => void;
	pegawai?: PegawaiDetail;
	setPegawai: (pegawai: PegawaiDetail) => void;
	defaultBatalCutiPegawai: BatalCutiPegawaiSchema;
	setDefaultBatalCutiPegawai: (value?: BatalCutiPegawaiSchema) => void;
	defaultKlaimCutiPegawai: KlaimCutiPegawaiSchema;
	setDefaultKlaimCutiPegawai: (value?: CutiPegawai) => void;
	openKlaim: boolean;
	setOpenKlaim: (open: boolean) => void;
	openInfo: boolean;
	setOpenInfo: (open: boolean) => void;
}

export const usePengajuanCutiStore = create<PengajuanCutiStore>((set) => ({
	defaultValue: {
		csrfToken: "",
		id: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		pangkatGolongan: "",
		organisasi: "",
		jabatan: "",
		jenisCutiId: 0,
		subJenisCutiId: 0,
		tanggalMulai: "",
		tanggalSelesai: "",
		jumlahHari: 0,
		jumlahHariKerja: 0,
		alasan: "",
	},
	setPegawaiValue: (pegawai) => {
		set((state) => ({
			defaultValue: {
				...state.defaultValue,
				pegawaiId: pegawai.id,
				nipam: pegawai.nipam,
				nama: pegawai.biodata.nama,
				pangkatGolongan: `${pegawai.golongan?.golongan} - ${pegawai.golongan?.pangkat}`,
				organisasi: pegawai.organisasi.nama,
				jabatan: pegawai.jabatan.nama,
			},
		}));
	},
	setDefaultValue: (pegawai, value) =>
		set((state) => ({
			...state,
			defaultValue: {
				...state.defaultValue,
				id: value?.id ?? 0,
				pegawaiId: value?.pegawaiId ?? pegawai.id,
				nipam: value?.nipam ?? pegawai.nipam,
				nama: value?.nama ?? pegawai.biodata.nama,
				pangkatGolongan:
					value?.pangkatGolongan ??
					`${pegawai.golongan?.golongan} - ${pegawai.golongan?.pangkat}`,
				organisasi: value?.organisasi?.nama ?? pegawai.organisasi.nama,
				jabatan: value?.jabatan?.nama ?? pegawai.jabatan.nama,
				jenisCutiId: value?.jenisCuti.id ?? 0,
				subJenisCutiId: value?.subJenisCuti?.id ?? 0,
				tanggalMulai: value?.tanggalMulai ?? "",
				tanggalSelesai: value?.tanggalSelesai ?? "",
				jumlahHari: value?.jumlahHari ?? 0,
				jumlahHariKerja: value?.jumlahHariKerja ?? 0,
				alasan: value?.alasan ?? "",
			},
		})),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	setCutiPegawai: (cutiPegawai) => set({ cutiPegawai }),
	setPegawai: (pegawai) => set({ pegawai }),
	defaultKlaimCutiPegawai: {
		csrfToken: "",
		id: 0,
		refCutiId: 0,
		pegawaiId: 0,
		nipam: "",
		nama: "",
		pangkatGolongan: "",
		organisasi: "",
		jabatan: "",
		jenisCutiId: 0,
		jenisCutiNama: "",
		subJenisCutiId: 0,
		subJenisCutiNama: "",
		tanggalMulai: "",
		tanggalSelesai: "",
		alasan: "",
		listHari: [],
		keterangan: "",
	},
	setDefaultKlaimCutiPegawai: (value) =>
		set((state) => ({
			...state,
			defaultKlaimCutiPegawai: {
				...state.defaultKlaimCutiPegawai,
				refCutiId: value?.id ?? 0,
				pegawaiId: value?.pegawaiId ?? 0,
				nipam: value?.nipam ?? "",
				nama: value?.nama ?? "",
				pangkatGolongan: value?.pangkatGolongan ?? "",
				organisasi: value?.organisasi?.nama ?? "",
				jabatan: value?.jabatan?.nama ?? "",
				jenisCutiId: value?.jenisCuti.id ?? 0,
				jenisCutiNama: value?.jenisCuti.nama ?? "",
				subJenisCutiId: value?.subJenisCuti?.id ?? 0,
				subJenisCutiNama: value?.subJenisCuti?.nama ?? "",
				tanggalMulai: value?.tanggalMulai ?? "",
				tanggalSelesai: value?.tanggalSelesai ?? "",
				alasan: value?.alasan ?? "",
			},
		})),
	defaultBatalCutiPegawai: {
		id: "",
		unique: "",
	},
	setDefaultBatalCutiPegawai: (value) =>
		set((state) => ({
			...state,
			defaultBatalCutiPegawai: {
				id: value?.id ?? "",
				unique: value?.unique ?? "",
			},
		})),
	openKlaim: false,
	setOpenKlaim: (open) => set({ openKlaim: open }),
	openInfo: false,
	setOpenInfo: (open) => set({ openInfo: open }),
}));
