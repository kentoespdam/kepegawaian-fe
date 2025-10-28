"use client"
import { Button } from "@components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@components/ui/sheet"
import { LayoutDashboardIcon } from "lucide-react"
import SheetMenuCommand from "./menu-command"
import { TopBarProps } from "@components/template/topbar"

const MenuSheet = ({ appData }: TopBarProps) => {
	const { user, pegawai } = appData ?? {}
	const roles = user?.prefs.roles ?? []
	const levelJabatan = pegawai?.jabatan.level.id ?? 0

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<LayoutDashboardIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="h-full w-fit p-0">
				<SheetTitle className="sr-only" />
				<SheetDescription className="sr-only" />
				<SheetMenuCommand roles={roles} levelJabatan={levelJabatan} />
			</SheetContent>
		</Sheet>
	)
}

export default MenuSheet
