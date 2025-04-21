import type { SystemRole, SystemRoleSchema } from "@_types/system/system_role";
import type { BaseDeleteStore } from "@store/base-store";
import { create } from "zustand";

interface RoleStore extends BaseDeleteStore {
	roleId: string;
	setRoleId: (val: string) => void;
	defaultValues: SystemRoleSchema;
	setDefaultValues: (val?: SystemRole) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
	roleId: "",
	setRoleId: (val) => set({ roleId: val }),
	defaultValues: {
		id: "",
	},
	setDefaultValues: (val) => set({ defaultValues: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
}));
