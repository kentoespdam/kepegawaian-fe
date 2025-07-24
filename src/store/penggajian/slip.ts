import { create } from "zustand";

interface SlipGajiStore {
	gajiId: number;
	setGajiId: (val: number) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
}

export const useSlipGajiStore = create<SlipGajiStore>()((set) => ({
	gajiId: 0,
	setGajiId: (val) => set({ gajiId: val }),
	open: false,
	setOpen: (val) => set({ open: val }),
}));
