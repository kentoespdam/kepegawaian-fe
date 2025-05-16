"use client";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { JSX } from "react";

const ThemeIcon = ({ theme }: { theme: string }) => (
	<>
		{theme === "light" ? (
			<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		) : (
			<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		)}
	</>
);

const ThemeMenuItem = ({
	theme,
	icon,
	label,
}: { theme: string; icon: JSX.Element; label: string }) => {
	const { setTheme } = useTheme();
	return (
		<DropdownMenuItem
			className="cursor-pointer"
			onClick={() => setTheme(theme)}
		>
			{icon}
			<span>{label}</span>
		</DropdownMenuItem>
	);
};

const ThemeButton = () => {
	return (
		<DropdownMenuGroup>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger className="cursor-pointer">
					<ThemeIcon theme="light" />
					<ThemeIcon theme="dark" />
					<span className="ml-3">Toggle Theme</span>
				</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent>
						<ThemeMenuItem
							theme="light"
							icon={<SunIcon className="mr-2 h-4 w-4" />}
							label="Light"
						/>
						<ThemeMenuItem
							theme="dark"
							icon={<MoonIcon className="mr-2 h-4 w-4" />}
							label="Dark"
						/>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>
		</DropdownMenuGroup>
	);
};

export default ThemeButton;
