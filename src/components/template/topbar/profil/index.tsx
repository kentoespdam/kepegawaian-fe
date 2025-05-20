import type { Pegawai } from "@_types/pegawai";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { getDataById } from "@helpers/action";
import { getCurrentUser } from "@lib/appwrite/user";
import { KeyRoundIcon } from "lucide-react";
import Image from "next/image";
import LogoutButton from "./button/logout";
import ThemeButton from "./button/theme";

const ProfileComponent = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: user.$id,
		isRoot: true,
	});

	return (
		<div className="flex items-center gap-3 py-2">
			<div className="hidden md:block lg:block">
				<div className="flex flex-col">
					<h6 className="font-medium text-foreground">{user.name}</h6>
					<span className="text-[10pt] font-normal text-foreground">
						{pegawai?.jabatan.nama}
					</span>
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="h-10 w-10 cursor-pointer">
						<Image
							src="https://github.com/shadcn.png"
							alt="Employee Photo"
							loading="lazy"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
						<AvatarFallback>ID</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{user.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer hover:bg-accent">
						<KeyRoundIcon className="mr-2 h-[1.2rem] w-[1.2rem]" />
						<span>Change Password</span>
					</DropdownMenuItem>
					<ThemeButton />

					<LogoutButton />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ProfileComponent;
