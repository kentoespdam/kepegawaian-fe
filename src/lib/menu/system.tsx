import { BracesIcon, UsersIcon } from "lucide-react";
import type { IMenu } from "..";

const defaultIconClassName = "w-3 h-3";

export const menuSystem: IMenu = {
	path: "#",
	name: "System",
	type: "group",
	role: ["ADMIN"],
	subMenu: [
		{
			path: "/system/roles",
			name: "Roles",
			icon: <BracesIcon className={defaultIconClassName} />,
			role: ["SYSTEM"],
		},
		{
			path: "/system/users",
			name: "Users",
			icon: <UsersIcon className={defaultIconClassName} />,
			role: ["SYSTEM"],
		},
	],
};
