"use client";
import { Home, Package2, Undo2Icon, UndoIcon } from "lucide-react";
import Link from "next/link";

import CustomQueryProvider from "@components/providers/query";
import { Toaster } from "@components/ui/toaster";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";
import { ButtonLink } from "@components/ui/link";
import TooltipBuilder from "@components/builder/tooltip";
import { Separator } from "@components/ui/separator";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const layout = ({ children }: ChildrenNode) => {
	return (
		<CustomQueryProvider queryClient={queryClient}>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="border bg-muted/40 md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-10 items-center border-b px-2 lg:h-[60px] lg:px-6">
							<div className="flex items-center gap-2 font-semibold">
								<TooltipBuilder text="Kembali" className="bg-destructive text-destructive-foreground">
									<ButtonLink
										href="/kepegawaian/data_pegawai"
										icon={<Undo2Icon className="h-5 w-5" />}
										variant="ghost"
										size="icon"
										className="text-destructive"
									/>
								</TooltipBuilder>
								<Separator orientation="vertical" className="h-6"/>
								<Package2 className="h-6 w-6" />
								<span className="">Kategori</span>
							</div>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<Home className="h-4 w-4" />
									Data Pendidikan
								</Link>
							</nav>
						</div>
					</div>
				</div>

				{children}
			</div>
			<Toaster />
		</CustomQueryProvider>
	);
};

export default layout;
