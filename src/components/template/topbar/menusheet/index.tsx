"use client";
import { Button } from "@components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@components/ui/sheet";
import { LayoutDashboardIcon } from "lucide-react";
import SheetMenuCommand from "./menu-command";
import type { Models } from "node-appwrite";

interface MenuSheetProps {
	user: Models.User<Models.Preferences>;
}
const MenuSheet = ({ user }: MenuSheetProps) => {
	const roles = user.prefs.roles;
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<LayoutDashboardIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-fit p-0 h-full">
				<SheetTitle>{""}</SheetTitle>
				<SheetMenuCommand roles={roles} />
			</SheetContent>
		</Sheet>
	);
};

export default MenuSheet;
