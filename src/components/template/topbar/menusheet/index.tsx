"use client";
import type { PegawaiDetail } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { LayoutDashboardIcon } from "lucide-react";
import type { Models } from "node-appwrite";
import SheetMenuCommand from "./menu-command";

interface MenuSheetProps {
	user: Models.User<Models.Preferences>;
	pegawai: PegawaiDetail;
}
const MenuSheet = ({ user, pegawai }: MenuSheetProps) => {
	const roles = user.prefs.roles;
	const levelJabatan = pegawai.jabatan.level.id;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<LayoutDashboardIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-fit p-0 h-full">
				<SheetMenuCommand roles={roles} levelJabatan={levelJabatan} />
			</SheetContent>
		</Sheet>
	);
};

export default MenuSheet;
