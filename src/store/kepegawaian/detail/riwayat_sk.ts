import type {
	RiwayatSk,
	RiwayatSkSchema,
} from "@_types/kepegawaian/riwayat_sk";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface RiwayatSkStore extends SelectedHandlerStore {
	riwayatSkId: number;
	setRiwayatSkId: (val: number) => void;
	defaultValues: RiwayatSkSchema;
	setDefaultValues: (pegawaiId: number, riwayatSk?: RiwayatSk) => void;
}

export const useRiwayatSkStore = create<RiwayatSkStore>((set) => ({
	riwayatSkId: 0,
	setRiwayatSkId: (val) => set({ riwayatSkId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		pegawaiId: 0,
		nomorSk: "",
		jenisSk: "",
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
		notes: "",
	},
	setDefaultValues: (pegawaiId, riwayatSk) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: riwayatSk?.id ?? 0,
				pegawaiId: Number(pegawaiId) ?? 0,
				nomorSk: riwayatSk?.nomorSk ?? "",
				jenisSk: riwayatSk?.jenisSk ?? "",
				tanggalSk: riwayatSk?.tanggalSk ?? "",
				tmtBerlaku: riwayatSk?.tmtBerlaku ?? "",
				golonganId: riwayatSk?.golongan?.id ?? 0,
				gajiPokok: riwayatSk?.gajiPokok ?? 0,
				mkgTahun: riwayatSk?.mkgTahun ?? 0,
				mkgBulan: riwayatSk?.mkgBulan ?? 0,
				kenaikanBerikutnya: riwayatSk?.kenaikanBerikutnya ?? "",
				mkgbTahun: riwayatSk?.mkgbTahun ?? 0,
				mkgbBulan: riwayatSk?.mkgbBulan ?? 0,
				updateMaster: riwayatSk?.updateMaster ?? false,
				notes: riwayatSk?.notes ?? "",
			},
		})),
	selectedDataId: 0,
	setSelectedDataId: (val) => set({ selectedDataId: val }),
}));
