"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";

const RAIL_ITEMS = [
	{ id: "mutasi", label: "Data Mutasi", href: "./mutasi", active: true },
	{ id: "cuti", label: "Data Penggunaan Hak Cuti", href: "#", active: false },
	{ id: "kontrak", label: "Riwayat Kontrak Kerja", href: "#", active: false },
	{ id: "sk", label: "Riwayat Surat Keputusan", href: "#", active: false },
	{ id: "sp", label: "Riwayat Surat Peringatan", href: "#", active: false },
] as const;

function RailSkeleton() {
	return (
		<nav className="space-y-1 w-full">
			{RAIL_ITEMS.map((item) => (
				<div key={item.id} className="flex items-center h-11 px-3 rounded-md text-sm text-muted-foreground">
					<Skeleton className="h-4 w-full max-w-40" />
				</div>
			))}
		</nav>
	);
}

function Rail() {
	return (
		<nav className="space-y-1 w-full" aria-label="Kategori Riwayat">
			{RAIL_ITEMS.map((item) =>
				item.active ? (
					<Link
						key={item.id}
						href={item.href}
						className="flex items-center h-11 px-3 rounded-md text-sm font-medium text-foreground bg-accent transition-colors hover:bg-accent/80"
					>
						{item.label}
					</Link>
				) : (
					<span
						key={item.id}
						className="flex items-center h-11 px-3 rounded-md text-sm text-muted-foreground cursor-not-allowed"
					>
						{item.label}
					</span>
				),
			)}
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

function HeaderError() {
	return (
		<div className="">
			<p className="text-sm text-muted-foreground">Gagal memuat data pegawai</p>
		</div>
	);
}

function Header({ nipam, nama }: { nipam: string | undefined; nama: string | undefined }) {
	return (
		<div>
			<h1 className="text-lg font-semibold text-foreground">
				Data Mutasi Pegawai [{nipam ?? "—"}] ({nama ?? "—"})
			</h1>
		</div>
	);
}

export default function RiwayatLayout({ children }: { children: React.ReactNode }) {
	const params = useParams<{ pegawaiId: string }>();
	const pegawaiId = params.pegawaiId;

	const sessionQuery = useQuery({
		queryKey: ["pegawai-session", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/session`);
			if (!res.ok) throw new Error("Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseSession;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});

	return (
		<div className="flex flex-col gap-4">
			{/* Back arrow + header */}
			<div className="flex items-start gap-3">
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
						<HeaderError />
					) : (
						<Header nipam={sessionQuery.data?.nipam} nama={sessionQuery.data?.nama} />
					)}
				</div>
			</div>

			{/* Rail + content */}
			<div className="flex gap-5 items-start">
				<div className="w-56 shrink-0 rounded-lg border bg-card shadow-sm p-3 sticky top-4">
					<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Kategori</h2>
					{sessionQuery.isPending ? <RailSkeleton /> : <Rail />}
				</div>
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
