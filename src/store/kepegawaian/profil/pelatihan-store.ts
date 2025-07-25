import type { Biodata } from "@_types/profil/biodata";
import type { Pelatihan, PelatihanSchema } from "@_types/profil/pelatihan";
import { create } from "zustand";

interface PelatihanStore {
	pelatihanId: number;
	setPelatihanId: (val: number) => void;
	selectedPelatihanId: number;
	setSelectedPelatihanId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
	defaultValues: PelatihanSchema;
	setDefaultValues: (biodata: Biodata, pelatihan?: Pelatihan) => void;
}

export const usePelatihanStore = create<PelatihanStore>((set) => ({
	pelatihanId: 0,
	setPelatihanId: (val) => set({ pelatihanId: val }),
	selectedPelatihanId: 0,
	setSelectedPelatihanId: (val) => set({ selectedPelatihanId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues: {
		id: 0,
		biodataId: "",
		jenisPelatihanId: 0,
		nama: "",
		lembaga: "",
		nilai: 0,
		lulus: true,
		tanggalMulai: "",
		tanggalSelesai: "",
		ikatanDinas: false,
		tanggalAkhirIkatan: "",
		notes: "",
	},
	setDefaultValues: (biodata, pelatihan) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: pelatihan?.id || 0,
				biodataId: biodata.nik || "",
				jenisPelatihanId: pelatihan?.jenisPelatihan.id || 0,
				nama: pelatihan?.nama || "",
				lembaga: pelatihan?.lembaga || "",
				nilai: pelatihan?.nilai || 0,
				lulus: pelatihan?.lulus || true,
				tanggalMulai: pelatihan?.tanggalMulai || "",
				tanggalSelesai: pelatihan?.tanggalSelesai || "",
				ikatanDinas: pelatihan?.ikatanDinas || false,
				tanggalAkhirIkatan: pelatihan?.tanggalAkhirIkatan || "",
				notes: pelatihan?.notes || "",
			},
		})),
}));
