"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Award, BookOpen, Briefcase, CreditCard, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { cn, isNotFound, throwIfNotOk } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";

// ponytail: icon per item untuk scannability — mapping id→icon sekali di sini
const ITEM_ICONS: Record<string, typeof GraduationCap> = {
	pendidikan: GraduationCap,
	"pengalaman-kerja": Briefcase,
	keahlian: Award,
	pelatihan: BookOpen,
	"kartu-identitas": CreditCard,
	keluarga: Users,
} as const;

const PAGE_TITLES: Record<string, string> = {
	pendidikan: "Data Pendidikan",
	"pengalaman-kerja": "Pengalaman Kerja",
	keahlian: "Keahlian",
	"kartu-identitas": "Kartu Identitas",
	pelatihan: "Pelatihan",
	keluarga: "Keluarga",
} as const;

const RAIL_ITEMS = [
	{ id: "pendidikan", label: "Data Pendidikan", href: "./pendidikan" },
	{ id: "pengalaman-kerja", label: "Pengalaman Kerja", href: "./pengalaman-kerja" },
	{ id: "keahlian", label: "Keahlian", href: "./keahlian" },
	{ id: "pelatihan", label: "Pelatihan", href: "./pelatihan" },
	{ id: "kartu-identitas", label: "Kartu Identitas", href: "./kartu-identitas" },
	{ id: "keluarga", label: "Keluarga", href: "./keluarga" },
] as const;

// ponytail: kategori yang sudah jadi — sisanya non-aktif + badge "Segera" (tambah saat Fase 2 jalan)
const ENABLED_CATEGORIES: readonly string[] = [
	"pendidikan",
	"pengalaman-kerja",
	"keahlian",
	"kartu-identitas",
	"pelatihan",
	"keluarga",
];

function RailSkeleton() {
	return (
		<nav className="space-y-0.5 w-full">
			{RAIL_ITEMS.map((item) => (
				<div key={item.id} className="flex items-center h-11 px-3 rounded-md text-sm text-muted-foreground">
					<Skeleton className="size-5 shrink-0 mr-3 rounded" />
					<Skeleton className="h-4 w-full max-w-32" />
				</div>
			))}
		</nav>
	);
}

function Rail({ currentPage }: { currentPage: string }) {
	return (
		<nav className="space-y-0.5 w-full" aria-label="Kategori Data Pendukung">
			{RAIL_ITEMS.map((item) => {
				const isActive = currentPage === item.id;
				const isEnabled = ENABLED_CATEGORIES.includes(item.id);
				const Icon = ITEM_ICONS[item.id];

				if (!isEnabled) {
					return (
						<div
							key={item.id}
							aria-disabled="true"
							className="flex items-center h-11 px-3 rounded-md text-sm font-medium text-muted-foreground opacity-60"
						>
							<Icon className="size-5 shrink-0 mr-3" />
							<span className="flex-1 truncate">{item.label}</span>
							<Badge variant="outline" className="text-[10px] px-1.5 py-0">
								Segera
							</Badge>
						</div>
					);
				}

				return (
					<Link
						key={item.id}
						href={item.href}
						className={cn(
							"group relative flex items-center h-11 px-3 rounded-md text-sm font-medium transition-all duration-150",
							isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
						)}
					>
						{/* Left border accent — active only */}
						<span
							className={cn(
								"absolute inset-y-0 left-0 w-0.5 bg-primary rounded-r transition-transform duration-150",
								isActive ? "scale-y-100" : "scale-y-0",
							)}
						/>
						<Icon
							className={cn(
								"size-5 shrink-0 mr-3 transition-colors duration-150",
								isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
							)}
						/>
						<span>{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}

function HeaderSkeleton() {
	return (
		<div className="space-y-1.5">
			<Skeleton className="h-6 w-64" />
			<Skeleton className="h-4 w-48" />
		</div>
	);
}

function HeaderError({ error }: { error: Error | null }) {
	return (
		<div>
			<p className="text-sm text-muted-foreground">
				{isNotFound(error) ? "Data pegawai tidak ditemukan" : "Gagal memuat data pegawai"}
			</p>
		</div>
	);
}

function Header({ title, nipam, nama }: { title: string; nipam: string | undefined; nama: string | undefined }) {
	return (
		<div>
			<h1 className="text-lg font-semibold text-foreground">
				{title} — [{nipam ?? "—"}] ({nama ?? "—"})
			</h1>
		</div>
	);
}

export default function PendukungLayout({ children }: { children: React.ReactNode }) {
	const params = useParams<{ pegawaiId: string }>();
	const pathname = usePathname();
	const pegawaiId = params.pegawaiId;

	// ponytail: derive current page from path — segment terakhir setelah /pendukung/
	const currentPage = pathname.split("/pendukung/").pop() ?? "pendidikan";
	const pageTitle = PAGE_TITLES[currentPage] ?? "Data Pendukung";

	const sessionQuery = useQuery({
		queryKey: riwayatKeys.session(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/session`);
			throwIfNotOk(res, "Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseSession;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});

	return (
		<div className="flex flex-col gap-4">
			{/* Back arrow + header */}
			<div className="flex items-center gap-3">
				<Link
					href="/kepegawaian/data"
					className="flex items-center justify-center size-10 shrink-0 rounded-md hover:bg-accent transition-colors mt-0.5"
					aria-label="Kembali ke Data Pegawai"
				>
					<ArrowLeft className="size-5" />
				</Link>
				<div className="flex-1 min-w-0">
					{sessionQuery.isPending ? (
						<HeaderSkeleton />
					) : sessionQuery.isError ? (
						<HeaderError error={sessionQuery.error} />
					) : (
						<Header title={pageTitle} nipam={sessionQuery.data?.nipam} nama={sessionQuery.data?.nama} />
					)}
				</div>
			</div>

			{/* Rail + content */}
			<div className="flex gap-5 items-start">
				<div className="w-64 shrink-0 rounded-lg border bg-card shadow-sm p-4 sticky top-4">
					<div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
						<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Kategori Data Pendukung
						</h2>
					</div>
					{sessionQuery.isPending ? <RailSkeleton /> : <Rail currentPage={currentPage} />}
				</div>
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
