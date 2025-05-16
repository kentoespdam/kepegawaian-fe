"use client";
import {
	BookOpenIcon,
	ContactIcon,
	GraduationCapIcon,
	HistoryIcon,
	Package2,
	TelescopeIcon,
	Undo2Icon,
} from "lucide-react";
import Link from "next/link";

import TooltipBuilder from "@components/builder/tooltip";
import CustomQueryProvider from "@components/providers/query";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";
import type { ChildrenNode } from "@lib/index";
import { cn } from "@lib/utils";
import { IdCardIcon } from "@radix-ui/react-icons";
import { QueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

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
									href={`/kepegawaian/pendukung/pendidikan/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "pendidikan" ? "text-info" : "",
									)}
								>
									<GraduationCapIcon className="h-4 w-4" />
									Data Pendidikan
								</Link>

								<Link
									href={`/kepegawaian/pendukung/pengalaman_kerja/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "pengalaman_kerja" ? "text-info" : "",
									)}
								>
									<HistoryIcon className="h-4 w-4" />
									Pengalaman Kerja
								</Link>

								<Link
									href={`/kepegawaian/pendukung/keahlian/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "keahlian" ? "text-info" : "",
									)}
								>
									<TelescopeIcon className="h-4 w-4" />
									Keahlian
								</Link>

								<Link
									href={`/kepegawaian/pendukung/pelatihan/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "pelatihan" ? "text-info" : "",
									)}
								>
									<BookOpenIcon className="h-4 w-4" />
									Pelatihan
								</Link>

								<Link
									href={`/kepegawaian/pendukung/kartu_identitas/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "kartu_identitas" ? "text-info" : "",
									)}
								>
									<IdCardIcon className="h-4 w-4" />
									Kartu Identitas
								</Link>

								<Link
									href={`/kepegawaian/pendukung/keluarga/${paths[4]}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
										paths[3] === "keluarga" ? "text-info" : "",
									)}
								>
									<ContactIcon className="h-4 w-4" />
									Keluarga
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

export default Layout;
