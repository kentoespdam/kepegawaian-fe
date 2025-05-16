import type { BaseDeleteStore, BaseSelectedStore } from "@store/base-store";
import { create } from "zustand";

interface JenjangPendidikanStore extends BaseSelectedStore, BaseDeleteStore {}

export const useJenjangPendidikanStore = create<JenjangPendidikanStore>(
	(set) => ({
		selectedDataId: 0,
		setSelectedDataId: (val) => set({ selectedDataId: val }),
		openDelete: false,
		setOpenDelete: (val) => set({ openDelete: val }),
	}),
);
