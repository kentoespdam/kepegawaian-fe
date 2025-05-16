import { create } from "zustand";

interface RingkasanPegawaiStore {
	pegawaiId?: number;
	setPegawaiId: (id?: number) => void;
	pegawaiNik?: string;
	setPegawaiNik: (pegawaiNik?: string) => void;
}

export const useRingkasanPegawaiStore = create<RingkasanPegawaiStore>(
	(set) => ({
		setPegawaiId: (id) => set({ pegawaiId: id }),
		setPegawaiNik: (pegawaiNik) => set({ pegawaiNik: pegawaiNik }),
	}),
);
