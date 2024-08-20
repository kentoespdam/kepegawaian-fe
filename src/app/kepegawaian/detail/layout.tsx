"use client";
import { Home, Package2, Undo2Icon, UndoIcon } from "lucide-react";
import Link from "next/link";

import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";
import { ButtonLink } from "@components/ui/link";
import TooltipBuilder from "@components/builder/tooltip";
import { Separator } from "@components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";
import { Toaster } from "@components/ui/sonner";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const Layout = ({ children }: ChildrenNode) => {
	const path = usePathname();
	const paths = path.split("/");
	return (
		<CustomQueryProvider queryClient={queryClient}>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="border bg-muted/40 md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-10 items-center border-b px-2 lg:h-[60px] lg:px-6">
							<div className="flex items-center gap-2 font-semibold">
								<TooltipBuilder
									text="Kembali"
									className="bg-destructive text-destructive-foreground"
								>
									<ButtonLink
										href="/kepegawaian/data_pegawai"
										icon={<Undo2Icon className="h-5 w-5" />}
										variant="ghost"
										size="icon"
										className="text-destructive"
									/>
								</TooltipBuilder>
								<Separator orientation="vertical" className="h-6" />
								<Package2 className="h-6 w-6" />
								<span className="">Kategori</span>
							</div>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<Link
									href={`/kepegawaian/detail/jabatan/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "jabatan" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Data Jabatan & Unit Kerja
								</Link>

								<Link
									href={`/kepegawaian/detail/cuti/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "cuti" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Data Penggunaan Hak Cuti
								</Link>

								<Link
									href={`/kepegawaian/detail/riwayat_kontrak/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "riwayat_kontrak" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Riwayat Kontrak Kerja
								</Link>

								<Link
									href={`/kepegawaian/detail/riwayat_sk/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "riwayat_sk" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Riwayat Surat Keputusan
								</Link>

								<Link
									href={`/kepegawaian/detail/riwayat_sp/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "riwayat_sp" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Riwayat Surat Peringatan
								</Link>

								{/* <Link
									href={`/kepegawaian/detail/keluarga/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "keluarga" ? "text-info" : "",
									)}
								>
									<Home className="h-4 w-4" />
									Keluarga
								</Link> */}
							</nav>
						</div>
					</div>
				</div>

				{children}
			</div>
			<Toaster richColors />
		</CustomQueryProvider>
	);
};

export default Layout;
