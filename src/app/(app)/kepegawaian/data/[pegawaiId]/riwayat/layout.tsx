"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, CalendarRange, FileSignature, FileText, NotebookText } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, isNotFound, throwIfNotOk } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";

// ponytail: icon per item untuk scannability — mapping id→icon sekali di sini
const ITEM_ICONS: Record<string, typeof FileText> = {
	mutasi: NotebookText,
	cuti: CalendarRange,
	kontrak: FileSignature,
	sk: FileText,
	sp: AlertTriangle,
} as const;

// ponytail: title map untuk header dinamis
const PAGE_TITLES: Record<string, string> = {
	mutasi: "Riwayat Mutasi",
	cuti: "Riwayat Cuti",
	sk: "Riwayat Surat Keputusan",
	kontrak: "Riwayat Kontrak Kerja",
	sp: "Riwayat Surat Peringatan",
} as const;

const RAIL_ITEMS = [
	{ id: "mutasi", label: "Data Mutasi", href: "./mutasi" },
	{ id: "cuti", label: "Data Penggunaan Hak Cuti", href: "./cuti" },
	{ id: "kontrak", label: "Riwayat Kontrak Kerja", href: "./kontrak" },
	{ id: "sk", label: "Riwayat Surat Keputusan", href: "./sk" },
	{ id: "sp", label: "Riwayat Surat Peringatan", href: "./sp" },
] as const;

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

// ponytail: semua 5 kategori aktif sejak cuti dibuka — cabang disabled + badge "Segera" dihapus (dead code)
function Rail({ currentPage }: { currentPage: string }) {
	return (
		<nav className="space-y-0.5 w-full" aria-label="Kategori Riwayat">
			{RAIL_ITEMS.map((item) => {
				const isActive = currentPage === item.id;
				const Icon = ITEM_ICONS[item.id];

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

export default function RiwayatLayout({ children }: { children: React.ReactNode }) {
	const params = useParams<{ pegawaiId: string }>();
	const pathname = usePathname();
	const pegawaiId = params.pegawaiId;

	// ponytail: derive current page from path — segment terakhir setelah /riwayat/
	const currentPage = pathname.split("/riwayat/").pop() ?? "mutasi";
	const pageTitle = PAGE_TITLES[currentPage] ?? "Riwayat Pegawai";

	const sessionQuery = useQuery({
		queryKey: ["pegawai-session", pegawaiId],
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
						<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kategori Riwayat</h2>
					</div>
					{sessionQuery.isPending ? <RailSkeleton /> : <Rail currentPage={currentPage} />}
				</div>
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
