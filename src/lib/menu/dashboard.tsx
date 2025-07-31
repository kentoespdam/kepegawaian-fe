import { HomeIcon } from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";

export const menuDashboard: IMenu = {
	path: "#",
	name: "Navigation",
	type: "group",
	role: ["USER"],
	subMenu: [
		{
			path: "/dashboard",
			name: "Dashboard",
			icon: <HomeIcon className={defaultIconClassName} />,
			role: ["USER"],
		},
	],
};
