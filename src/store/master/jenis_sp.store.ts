import type { JenisSp, JenisSpSchema } from "@_types/master/jenis_sp";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface JenisSpStore extends BaseDeleteStore {
	jenisSp?: JenisSp;
	setJenisSp: (jenisSp: JenisSp) => void;
	defaultValues: JenisSpSchema;
	setDefaultValues: (defaultValues?: JenisSp) => void;
	openJenisSpForm: boolean;
	setOpenJenisSpForm: (openJenisSpForm: boolean) => void;
	openSanksi: boolean;
	setOpenSanksi: (openSanksi: boolean) => void;
}

export const useJenisSpStore = create<JenisSpStore>()((set) => ({
	setJenisSp: (jenisSp: JenisSp) => set({ jenisSp }),
	defaultValues: {
		id: 0,
		kode: "",
		nama: "",
	},
	setDefaultValues: (defaultValues) =>
		set({
			defaultValues: {
				id: defaultValues?.id || 0,
				kode: defaultValues?.kode || "",
				nama: defaultValues?.nama || "",
			},
		}),
	openJenisSpForm: false,
	setOpenJenisSpForm: (openJenisSpForm: boolean) => set({ openJenisSpForm }),
	openSanksi: false,
	setOpenSanksi: (openSanksi: boolean) => set({ openSanksi }),
	openDelete: false,
	setOpenDelete: (openDelete: boolean) => set({ openDelete }),
}));
