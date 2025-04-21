"use client";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import { SheetClose } from "@components/ui/sheet";
import { type IMenu, menus } from "@lib/index";
import { cn } from "@lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuListBuilderProps = {
	menu: IMenu;
	roles: string[];
};
const MenulistBuilder = (props: MenuListBuilderProps) => {
	const pathName = usePathname();
	const menuPath = props.menu.path.split("?")[0];

	return props.menu.type === "group" ? (
		props.roles.some((role) => props.menu.role.includes(role)) ? (
			<CommandGroup heading={props.menu.name}>
				{props.menu.subMenu?.length === 0
					? null
					: props.menu.subMenu?.map((menu) => (
							<MenulistBuilder
								menu={menu}
								key={`${menu.name}-${menu.path}`}
								roles={props.roles}
							/>
						))}
			</CommandGroup>
		) : null
	) : props.roles.some((role) => props.menu.role.includes(role)) ? (
		<SheetClose asChild>
			<Link href={props.menu.path} className="cursor pointer">
				<CommandItem
					className={cn(
						"cursor-pointer gap-2 pl-4",
						pathName.includes(menuPath)
							? "bg-primary text-primary-foreground"
							: "",
					)}
				>
					{props.menu.icon}
					{props.menu.name}
					{pathName.startsWith(props.menu.path) ? (
						<CheckIcon className="ml-auto" />
					) : null}
				</CommandItem>
			</Link>
		</SheetClose>
	) : null;
};

interface SheetMenuCommandProps {
	roles: string[];
}
const SheetMenuCommand = ({ roles }: SheetMenuCommandProps) => {
	return (
		<Command className="h-full">
			<CommandInput placeholder="Type to search..." />
			<CommandList className="h-screen max-h-[100%]">
				<CommandEmpty>No results found.</CommandEmpty>
				{menus.map((menu) => (
					<MenulistBuilder
						menu={menu}
						key={`${menu.name}-${menu.path}`}
						roles={roles}
					/>
				))}
			</CommandList>
		</Command>
	);
};

export default SheetMenuCommand;
