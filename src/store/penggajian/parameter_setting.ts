import type {
	ParameterSetting,
	ParameterSettingSchema,
} from "@_types/penggajian/parameter_setting";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface ParameterSettingStore extends BaseDeleteStore {
	parameterSettingId: number;
	setParameterSettingId: (id: number) => void;
	defaultValues: ParameterSettingSchema;
	setDefaultValues: (val?: ParameterSetting) => void;
}

export const useParameterSettingStore = create<ParameterSettingStore>((set) => ({
	parameterSettingId: 0,
	setParameterSettingId: (id) => set({ parameterSettingId: id }),
	defaultValues: {
		id: 0,
		kode: "",
		nominal: 0,
	},
	setDefaultValues: (val) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: val?.id || 0,
				kode: val?.kode || "",
				nominal: val?.nominal || 0,
			},
		})),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
