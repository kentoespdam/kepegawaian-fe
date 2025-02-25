import type {
	RefPotonganTkk,
	RefPotonganTkkSchema,
} from "@_types/penggajian/ref_potongan_tkk";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface RefPotonganTkkStore extends BaseDeleteStore {
	refPotonganTkkId: number;
	setRefPotonganTkkId: (id: number) => void;
	defaultValues: RefPotonganTkkSchema;
	setDefaultValues: (val?: RefPotonganTkk) => void;
}

export const useRefPotonganTkkStore = create<RefPotonganTkkStore>((set) => ({
	refPotonganTkkId: 0,
	setRefPotonganTkkId: (id) => set({ refPotonganTkkId: id }),
	defaultValues: {
		id: 0,
		statusPegawai: "",
		levelId: 0,
		golonganId: 0,
		nominal: 0,
	},
	setDefaultValues: (val) =>
		set(store=>({
            ...store,
            defaultValues:{
                id: val?.id || 0,
                statusPegawai: val?.statusPegawai || "",
                levelId: val?.level.id || 0,
                golonganId: val?.golongan?.id || 0,
                nominal: val?.nominal || 0
            }
        })),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
