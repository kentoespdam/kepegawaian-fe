import { create } from "zustand";

interface UserStore {
	userId: string;
	setUserId: (id: string) => void;
	openChangePassword: boolean;
	setOpenChangePassword: (val: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	userId: "",
	setUserId: (id) => set({ userId: id }),
	openChangePassword: false,
	setOpenChangePassword: (val) => set({ openChangePassword: val }),
}));
