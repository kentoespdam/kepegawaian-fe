import type { Pegawai } from "@_types/pegawai";
import type { User } from "@_types/user";
import { newCrypter } from "@lib/utils";

import { create } from "zustand";

interface SessionStore {
	user: string | null;
	setUser: (user: User | null) => void;
	getUser: () => User | null;
	pegawai?: Pegawai;
	setPegawai: (pegawai?: Pegawai) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
	user: null,
	setUser: (user) => set({ user: newCrypter.encrypt(JSON.stringify(user)) }),
	getUser: () => {
		const usr = get().user;
		if (!usr) return null;
		return JSON.parse(newCrypter.decrypt(usr) as string) as User;
	},
	setPegawai: (pegawai) => set({ pegawai }),
}));
