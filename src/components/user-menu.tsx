"use client";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import type { AppwriteUser } from "@/types/auth";

export function UserMenu({ user }: { user: AppwriteUser }) {
	const router = useRouter();
	const logout = useLogout();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const initial = user.name.charAt(0).toUpperCase();

	// Avoid hydration mismatch — next-themes only knows theme after mount
	useEffect(() => setMounted(true), []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
				<Avatar size="sm">
					<AvatarFallback>{initial}</AvatarFallback>
				</Avatar>
				<span className="hidden text-sm font-medium sm:inline text-foreground">{user.name}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col gap-0.5">
						<span className="font-medium text-foreground">{user.name}</span>
						<span className="text-xs font-normal text-muted-foreground">{user.email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => router.push("/profil")}>
					<User className="size-4" />
					Profil
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
					{mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
					{mounted && theme === "dark" ? "Mode Terang" : "Mode Gelap"}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" onClick={() => logout.mutate()} disabled={logout.isPending}>
					<LogOut className="size-4" />
					{logout.isPending ? "Keluar…" : "Keluar"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
