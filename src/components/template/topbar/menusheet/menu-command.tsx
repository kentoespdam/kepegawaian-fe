"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@components/ui/command";
import { SheetClose } from "@components/ui/sheet";
import { menus, type IMenu } from "@lib/index";
import { cn } from "@lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuListBuilderProps = {
    menu: IMenu;
};
const MenulistBuilder = (props: MenuListBuilderProps) => {
    const pathName = usePathname()
    return props.menu.type === "group" ? (
        <CommandGroup heading={props.menu.name}>
            {props.menu.subMenu?.length === 0
                ? null
                : props.menu.subMenu?.map((menu) => (
                    <MenulistBuilder menu={menu} key={`${menu.name}-${menu.path}`} />
                ))}
        </CommandGroup>
    ) : (
        <SheetClose asChild>
            <Link href={props.menu.path} className="cursor pointer">
                <CommandItem
                    className={
                        cn(
                            "cursor-pointer gap-2 pl-4",
                            pathName.includes(props.menu.path) ?
                                "bg-primary text-primary-foreground" :
                                ""
                        )}
                >
                    {props.menu.icon}
                    {props.menu.name}
                    {pathName.startsWith(props.menu.path) ? <CheckIcon className="ml-auto" /> : null}
                </CommandItem>
            </Link>
        </SheetClose>
    );
};

const SheetMenuCommand = () => {
    return (
        <Command className="h-full">
            <CommandInput placeholder="Type to search..." />
            <CommandList className="h-screen max-h-[100%]">
                <CommandEmpty>No results found.</CommandEmpty>
                {menus.map((menu) => (
                    <MenulistBuilder menu={menu} key={`${menu.name}-${menu.path}`} />
                ))}
            </CommandList>
        </Command>
    );
};

export default SheetMenuCommand;
