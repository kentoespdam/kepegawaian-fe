import type React from "react";
import { z } from "zod";
import { menuCuti } from "./menu/cuti";
import { menuDashboard } from "./menu/dashboard";
import { menuKepegawaian } from "./menu/kepegawaian";
import { menuLaporanKepegawaian } from "./menu/laporanKepegawaian";
import { menuMaster } from "./menu/master";
import { menuPenggajian } from "./menu/penggajian";
import { menuSystem } from "./menu/system";

export type ChildrenNode = {
	children: React.ReactNode;
};

const MenuType = z.enum(["group", "item"]);
type MenuType = z.infer<typeof MenuType>;

export const IMenu = z.object({
	path: z.string(),
	name: z.string(),
	role: z.array(z.string()),
	type: MenuType.optional(),
});

export type IMenu = z.infer<typeof IMenu> & {
	icon?: React.ReactElement;
	subMenu?: IMenu[];
};

export const menus: IMenu[] = [
	menuDashboard,
	menuCuti,
	menuMaster,
	menuKepegawaian,
	menuLaporanKepegawaian,
	menuPenggajian,
	menuSystem,
];
