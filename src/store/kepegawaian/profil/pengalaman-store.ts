import type { Biodata } from "@_types/profil/biodata";
import type {
	PengalamanKerja,
	PengalamanKerjaSchema,
} from "@_types/profil/pengalaman_kerja";
import { create } from "zustand";

const defaultValues: PengalamanKerjaSchema = {
	id: 0,
	biodataId: "",
	biodataName: "",
	namaPerusahaan: "",
	typePerusahaan: "",
	jabatan: "",
	lokasi: "",
	tanggalMasuk: "",
	tanggalKeluar: "",
	notes: "",
};

interface PengalamanKerjaStore {
	pengalamanId: number;
	setPengalamanId: (val: number) => void;
	selectedPengalamanId: number;
	setSelectedPengalamanId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
	defaultValues: PengalamanKerjaSchema;
	setDefaultValues: (biodata?: Biodata, pengalaman?: PengalamanKerja) => void;
}

export const usePengalamanKerjaStore = create<PengalamanKerjaStore>((set) => ({
	pengalamanId: 0,
	setPengalamanId: (val) => set({ pengalamanId: val }),
	selectedPengalamanId: 0,
	setSelectedPengalamanId: (val) => set({ selectedPengalamanId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	defaultValues,
	setDefaultValues: (biodata, pengalaman) => {
		set({
			defaultValues: {
				id: pengalaman?.id || 0,
				biodataId: biodata?.nik || "",
				biodataName: biodata?.nama || "",
				namaPerusahaan: pengalaman?.namaPerusahaan || "",
				typePerusahaan: pengalaman?.typePerusahaan || "",
				jabatan: pengalaman?.jabatan || "",
				lokasi: pengalaman?.lokasi || "",
				tanggalMasuk: pengalaman?.tanggalMasuk || "",
				tanggalKeluar: pengalaman?.tanggalKeluar || "",
				notes: pengalaman?.notes || "",
			},
		});
	},
}));
