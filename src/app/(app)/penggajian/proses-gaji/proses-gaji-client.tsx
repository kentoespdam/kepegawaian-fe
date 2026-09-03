"use client";

import {
	ArrowUpRight,
	Calendar,
	Filter,
	Loader2,
	Plus,
	RefreshCw,
	RotateCcw,
	Search,
	SlidersHorizontal,
	Trash2,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_BADGE, STATUS_LABELS, STATUS_OPTIONS } from "@/config/penggajian/batch-list.config";
import { useDeleteBatch, useReprocessBatch } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useAuth } from "@/hooks/useAuth";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { cn } from "@/lib/utils";
import type { GajiBatchRootResponse, StatusBatch } from "@/types/penggajian/batch";
import { CreateBatchDialog } from "../_components/create-batch-dialog";

const ENTITY = "batch";
const BASE = "/penggajian/proses-gaji";

function formatDate(v: unknown): string {
	const t = v as string | undefined;
	if (!t) return "-";
	try {
		return new Date(t).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
	} catch {
		return String(t);
	}
}

function formatPeriodeIndo(periodeStr?: string): string | null {
	if (!periodeStr || !/^\d{4}-\d{2}$/.test(periodeStr)) return null;
	const [y, m] = periodeStr.split("-");
	const monthIndex = parseInt(m, 10) - 1;
	const months = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	if (monthIndex >= 0 && monthIndex < 12) {
		return `${months[monthIndex]} ${y}`;
	}
	return null;
}

const BASE_COLUMNS = [
	{
		id: "periode",
		header: "Periode",
		sortable: true,
		primary: true,
		cell: (item: Record<string, unknown>) => {
			const raw = String(item.periode ?? "-");
			const human = formatPeriodeIndo(raw);
			return (
				<div className="flex flex-col py-0.5">
					<span className="font-semibold text-foreground text-sm tracking-tight">{raw}</span>
					{human && <span className="text-[11px] text-muted-foreground font-medium">{human}</span>}
				</div>
			);
		},
	},
	{
		id: "id",
		header: "Batch ID",
		sortable: true,
		cell: (item: Record<string, unknown>) => (
			<span className="font-mono text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/50">
				{String(item.id ?? "-")}
			</span>
		),
	},
	{
		id: "status",
		header: "Status",
		sortable: true,
		cell: (item: Record<string, unknown>) => {
			const s = item.status as StatusBatch | undefined;
			if (!s) return "-";
			return (
				<span
					className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
						STATUS_BADGE[s] ?? "bg-primary/10 text-primary"
					}`}
				>
					<span className="size-1.5 rounded-full bg-current opacity-75" />
					{STATUS_LABELS[s] ?? s}
				</span>
			);
		},
	},
	{
		id: "notes",
		header: "Notes",
		cell: (item: Record<string, unknown>) => {
			const note = String(item.notes ?? "-");
			return (
				<span className="text-xs text-muted-foreground max-w-44 truncate block" title={note}>
					{note}
				</span>
			);
		},
	},
	{
		id: "tanggalProses",
		header: "Tanggal Proses",
		sortable: true,
		cell: (item: Record<string, unknown>) => (
			<span className="text-xs font-medium text-foreground">{formatDate(item.tanggalProses)}</span>
		),
	},
	{
		id: "totalPegawai",
		header: "Total Pegawai",
		cell: (item: Record<string, unknown>) => (
			<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
				<Users className="size-3.5 text-muted-foreground" />
				{String(item.totalPegawai ?? 0)}
			</span>
		),
	},
	{
		id: "tanggalVerifikasiTahap1",
		header: "Verifikasi Tahap 1",
		cell: (item: Record<string, unknown>) => (
			<span className="text-xs text-muted-foreground">{formatDate(item.tanggalVerifikasiTahap1)}</span>
		),
	},
	{
		id: "tanggalVerifikasiTahap2",
		header: "Verifikasi Tahap 2",
		cell: (item: Record<string, unknown>) => (
			<span className="text-xs text-muted-foreground">{formatDate(item.tanggalVerifikasiTahap2)}</span>
		),
	},
	{
		id: "tanggalPersetujuan",
		header: "Persetujuan",
		cell: (item: Record<string, unknown>) => (
			<span className="text-xs text-muted-foreground">{formatDate(item.tanggalPersetujuan)}</span>
		),
	},
];

interface ProsesGajiClientProps {
	userName?: string;
}

export function ProsesGajiClient({ userName }: ProsesGajiClientProps) {
	const { permissions, roles } = useAuth();
	const canDelete = hasPermission(permissions, PERMISSION.PENGGAJIAN_DELETE, roles);
	const canProcess =
		hasPermission(permissions, PERMISSION.PENGGAJIAN_PROCESS, roles) ||
		hasPermission(permissions, PERMISSION.PENGGAJIAN_WRITE, roles) ||
		hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP, roles);

	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(ENTITY, BASE);
	const [createOpen, setCreateOpen] = useState(false);

	const [deletingBatch, setDeletingBatch] = useState<GajiBatchRootResponse | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [reprocessingBatch, setReprocessingBatch] = useState<GajiBatchRootResponse | null>(null);

	const list = useBatchList(toApiParams({ page, size, sortBy, sortDir, filters }));
	const pageView = fromPage(list.data);
	const rows = pageView.rows as GajiBatchRootResponse[];

	const deleteMutation = useDeleteBatch();
	const reprocessMutation = useReprocessBatch();

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	const handleConfirmDelete = async () => {
		if (!deletingBatch?.id) return;
		setDeleteError(null);
		try {
			await deleteMutation.mutateAsync(deletingBatch.id);
			toast.success(`Batch periode ${deletingBatch.periode ?? deletingBatch.id} berhasil dihapus`);
			setDeletingBatch(null);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Gagal menghapus batch";
			setDeleteError(msg);
			throw err;
		}
	};

	const handleConfirmReprocess = async () => {
		if (!reprocessingBatch?.id) return;
		try {
			await reprocessMutation.mutateAsync(reprocessingBatch.id);
			toast.success(`Proses ulang batch periode ${reprocessingBatch.periode ?? reprocessingBatch.id} berhasil`);
			setReprocessingBatch(null);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Gagal memproses ulang batch";
			toast.error(msg);
		}
	};

	const hasActiveFilter = Boolean(filters.periode || (filters.status && filters.status !== "ALL"));

	const columns = useMemo(() => {
		return [
			...BASE_COLUMNS,
			{
				id: "aksi",
				header: "Aksi",
				align: "right" as const,
				cell: (item: Record<string, unknown>) => {
					const b = item as GajiBatchRootResponse;
					const isReprocessEligible = canProcess && (b.status === "PENDING" || b.status === "FAILED");
					const isDeleteEligible = canDelete && b.status !== "FINISHED" && b.status !== "PROSES";

					// Next step navigation target
					const nextStep = (() => {
						if (b.status === "WAIT_VERIFICATION_PHASE_1") {
							return { label: "Verifikasi 1", href: "/penggajian/verifikasi" };
						}
						if (b.status === "WAIT_VERIFICATION_PHASE_2") {
							return { label: "Tambah Komponen", href: "/penggajian/tambahan" };
						}
						if (b.status === "WAIT_APPROVAL") {
							return { label: "Persetujuan", href: "/penggajian/persetujuan" };
						}
						return null;
					})();

					if (!isReprocessEligible && !isDeleteEligible && !nextStep) {
						return <span className="text-muted-foreground">-</span>;
					}

					return (
						<div className="inline-flex items-center gap-1.5 justify-end">
							{nextStep && (
								<Link
									href={nextStep.href}
									className={cn(
										buttonVariants({ variant: "outline", size: "sm" }),
										"h-7 text-xs px-2 gap-1 text-primary hover:bg-primary/10 hover:text-primary",
									)}
								>
									{nextStep.label}
									<ArrowUpRight className="size-3" />
								</Link>
							)}
							{isReprocessEligible && (
								<Button
									variant="ghost"
									size="icon"
									title="Proses Ulang"
									onClick={(e) => {
										e.stopPropagation();
										setReprocessingBatch(b);
									}}
									aria-label="Proses Ulang"
									className="size-8 hover:bg-primary/15 hover:text-primary transition-colors"
								>
									<RefreshCw className="size-4" />
								</Button>
							)}
							{isDeleteEligible && (
								<Button
									variant="ghost"
									size="icon"
									title="Hapus"
									onClick={(e) => {
										e.stopPropagation();
										setDeleteError(null);
										setDeletingBatch(b);
									}}
									aria-label="Hapus"
									className="size-8 hover:bg-destructive/15 hover:text-destructive transition-colors"
								>
									<Trash2 className="size-4 text-destructive" />
								</Button>
							)}
						</div>
					);
				},
			},
		];
	}, [canProcess, canDelete]);

	return (
		<div className="flex flex-col gap-6">
			{/* Page Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
							Fase 01 — Eksekusi Batch
						</span>
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-foreground">01. Proses Gaji Bulanan</h1>
					<p className="text-sm text-muted-foreground">
						Inisiasi, pantau, dan kelola proses batch payroll bulanan Perumdam Tirta Satria
					</p>
				</div>
				<div className="flex items-center gap-2.5">
					<Button variant="outline" size="sm" onClick={() => list.refetch()} className="gap-1.5 h-9">
						<RefreshCw className="size-4" />
						Muat Ulang
					</Button>
					<Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1.5 h-9 shadow-sm">
						<Plus className="size-4" />
						Buat Proses Gaji Baru
					</Button>
				</div>
			</div>

			{/* Filter Section */}
			<div className="rounded-xl border border-border/80 bg-card/90 backdrop-blur-sm p-4 shadow-xs space-y-3.5">
				{/* Top Header of Filter Container */}
				<div className="flex items-center justify-between border-b border-border/50 pb-2.5">
					<div className="flex items-center gap-2">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
							<SlidersHorizontal className="size-3.5" />
						</div>
						<span className="text-xs font-semibold text-foreground uppercase tracking-wider">
							Filter & Pencarian Batch
						</span>
						{hasActiveFilter && (
							<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/15 text-primary border border-primary/20">
								<span className="size-1.5 rounded-full bg-primary" />
								Filter Aktif
							</span>
						)}
					</div>{" "}
					<div className="text-xs text-muted-foreground">
						Menampilkan <span className="font-semibold text-foreground">{rows.length}</span> dari{" "}
						<span className="font-semibold text-foreground">{pageView.total}</span> batch
					</div>
				</div>

				{/* Controls Row */}
				<div className="flex flex-wrap items-end gap-3">
					<div className="flex flex-col gap-1.5">
						<Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
							<Calendar className="size-3.5 text-primary/80" />
							Periode Batch
						</Label>
						<div className="relative w-64">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
							<Input
								value={(filters.periode as string) ?? ""}
								onChange={(e) => handleFilterChange("periode", e.target.value.trim() || undefined)}
								placeholder="Filter Periode (YYYY-MM)…"
								className="pl-9 h-10 text-sm bg-background border-input shadow-2xs hover:border-input focus-visible:border-primary transition-colors"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
							<Filter className="size-3.5 text-primary/80" />
							Status Payroll
						</Label>
						<Select
							value={(filters.status as string) ?? "ALL"}
							onValueChange={(v) => handleFilterChange("status", !v || v === "ALL" ? undefined : v)}
						>
							<SelectTrigger
								className="w-56 h-10 text-sm bg-background border-input shadow-2xs hover:border-input focus-visible:border-primary transition-colors"
								aria-label="Filter Status"
							>
								<SelectValue placeholder="Semua Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ALL">Semua Status</SelectItem>
								{STATUS_OPTIONS.map((o) => (
									<SelectItem key={o.value} value={o.value}>
										{o.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{hasActiveFilter && (
						<Button
							variant="outline"
							size="sm"
							onClick={resetAll}
							className="h-10 text-xs px-3 border-dashed hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors gap-1.5"
						>
							<RotateCcw className="size-3.5" />
							Reset Filter
						</Button>
					)}
				</div>

				{/* Active Filter Chips */}
				{hasActiveFilter && (
					<div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/40">
						<span className="text-[11px] text-muted-foreground mr-1">Filter diterapkan:</span>
						{filters.periode && (
							<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted border border-border text-foreground">
								<span>
									Periode: <strong className="font-semibold">{filters.periode}</strong>
								</span>
								<button
									type="button"
									onClick={() => handleFilterChange("periode", undefined)}
									className="hover:text-destructive transition-colors ml-0.5 cursor-pointer"
									aria-label="Hapus filter periode"
								>
									<X className="size-3" />
								</button>
							</span>
						)}
						{filters.status && filters.status !== "ALL" && (
							<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted border border-border text-foreground">
								<span>
									Status:{" "}
									<strong className="font-semibold">
										{STATUS_LABELS[filters.status as StatusBatch] ?? filters.status}
									</strong>
								</span>
								<button
									type="button"
									onClick={() => handleFilterChange("status", undefined)}
									className="hover:text-destructive transition-colors ml-0.5 cursor-pointer"
									aria-label="Hapus filter status"
								>
									<X className="size-3" />
								</button>
							</span>
						)}
					</div>
				)}
			</div>

			<DataTable
				columns={columns}
				data={(rows as unknown as Record<string, unknown>[]) ?? []}
				isLoading={list.isPending}
				isPlaceholder={list.isPlaceholderData}
				isError={list.isError}
				error={list.error}
				onRetry={() => list.refetch()}
				sortBy={sortBy}
				sortDirection={sortDir}
				onSort={(key) => {
					if (sortBy === key) setP("sortDirection", sortDir === "asc" ? "desc" : "asc");
					else setP({ sortBy: key, sortDirection: "asc" });
				}}
				getRowId={(i) => String((i as Record<string, unknown>).id ?? "")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => setP("page", String(p))}
						onSizeChange={(s) => {
							setP("size", String(s));
							setP("page", "1");
						}}
					/>
				}
			/>

			<CreateBatchDialog
				open={createOpen}
				onOpenChange={setCreateOpen}
				onSuccess={() => {
					setCreateOpen(false);
					list.refetch();
				}}
				userName={userName}
			/>

			<ConfirmDeleteDialog
				open={!!deletingBatch}
				onOpenChange={(open) => !open && setDeletingBatch(null)}
				itemLabel={`Batch Periode ${deletingBatch?.periode ?? deletingBatch?.id ?? ""}`}
				onConfirm={handleConfirmDelete}
				error={deleteError}
			/>

			<AlertDialog open={!!reprocessingBatch} onOpenChange={(open) => !open && setReprocessingBatch(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Proses Ulang Batch</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin memproses ulang batch payroll periode{" "}
							<strong>{reprocessingBatch?.periode ?? reprocessingBatch?.id}</strong>?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={reprocessMutation.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							disabled={reprocessMutation.isPending}
							onClick={(e) => {
								e.preventDefault();
								handleConfirmReprocess();
							}}
						>
							{reprocessMutation.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
							{reprocessMutation.isPending ? "Memproses…" : "Proses Ulang"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
