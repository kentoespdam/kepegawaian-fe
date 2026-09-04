"use client";

import { ArrowUpRight, Loader2, Plus, RefreshCw, RotateCcw, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { PeriodeSelect } from "@/components/periode-filter";
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
import { getReprocessPhase } from "@/lib/utils/penggajian-reprocess";
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

function parseYearMonth(periodeStr?: string): { year: string; month: string } | null {
	if (!periodeStr) return null;
	const clean = periodeStr.trim();
	if (/^\d{4}-\d{2}$/.test(clean)) {
		const [year, month] = clean.split("-");
		return { year, month };
	}
	if (/^\d{6}$/.test(clean)) {
		return { year: clean.slice(0, 4), month: clean.slice(4, 6) };
	}
	return null;
}

function formatPeriodeIndo(periodeStr?: string): string | null {
	const parsed = parseYearMonth(periodeStr);
	if (!parsed) return null;
	const monthIndex = parseInt(parsed.month, 10) - 1;
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
		return `${months[monthIndex]} ${parsed.year}`;
	}
	return null;
}

const STATUS_DOT: Record<StatusBatch, string> = {
	PENDING: "bg-amber-500",
	PROSES: "bg-blue-500",
	WAIT_VERIFICATION_PHASE_1: "bg-purple-500",
	WAIT_VERIFICATION_PHASE_2: "bg-violet-500",
	WAIT_APPROVAL: "bg-orange-500",
	FINISHED: "bg-emerald-500",
	FAILED: "bg-rose-500",
};

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
	jabatanName?: string;
}

export function ProsesGajiClient({ userName, jabatanName }: ProsesGajiClientProps) {
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

	const parsedFilter = parseYearMonth(filters.periode as string | undefined);
	const filterYear = parsedFilter?.year ?? (filters.periode ? "" : "ALL");
	const filterMonth = parsedFilter?.month ?? (filters.periode ? "" : "ALL");

	const currentStatus = (filters.status as StatusBatch | "ALL" | undefined) ?? "ALL";
	const selectedStatusLabel =
		currentStatus === "ALL" || !currentStatus
			? "Semua Status"
			: (STATUS_LABELS[currentStatus as StatusBatch] ?? currentStatus);

	const handlePeriodeChange = (newYear: string, newMonth: string) => {
		if ((!newYear || newYear === "ALL") && (!newMonth || newMonth === "ALL")) {
			setFilter("periode", undefined);
			return;
		}
		const y = !newYear || newYear === "ALL" ? String(new Date().getFullYear()) : newYear;
		const m = !newMonth || newMonth === "ALL" ? undefined : newMonth;
		if (m) {
			setFilter("periode", `${y}-${m}`);
		} else {
			setFilter("periode", y);
		}
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
			const targetPhase = getReprocessPhase(reprocessingBatch.status);
			await reprocessMutation.mutateAsync({
				id: reprocessingBatch.id,
				data: {
					id: reprocessingBatch.id,
					nama: userName,
					jabatan: jabatanName ?? "Staf SDM",
					phase: targetPhase,
				},
			});
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

					const canVerify1 = hasPermission(permissions, PERMISSION.PENGGAJIAN_VERIFY1, roles);
					const canTambahan = hasPermission(permissions, PERMISSION.PENGGAJIAN_TAMBAHAN, roles);
					const canApprove = hasPermission(permissions, PERMISSION.PENGGAJIAN_APPROVE, roles);

					// Next step navigation target with period query parameters
					const nextStep = (() => {
						const parsed = parseYearMonth(b.periode);
						const qs = parsed ? `?year=${parsed.year}&month=${parsed.month}` : "";

						if (b.status === "WAIT_VERIFICATION_PHASE_1" && canVerify1) {
							return { label: "Verifikasi 1", href: `/penggajian/verifikasi${qs}` };
						}
						if (b.status === "WAIT_VERIFICATION_PHASE_2" && canTambahan) {
							return { label: "Tambah Komponen", href: `/penggajian/tambahan${qs}` };
						}
						if (b.status === "WAIT_APPROVAL" && canApprove) {
							return { label: "Persetujuan", href: `/penggajian/persetujuan${qs}` };
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
										"h-8 text-xs font-semibold px-2.5 gap-1.5 text-primary border-primary/30 bg-primary/5 hover:bg-primary/15 hover:text-primary transition-colors shadow-2xs",
									)}
								>
									{nextStep.label}
									<ArrowUpRight className="size-3.5" />
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
	}, [canProcess, canDelete, permissions, roles]);

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
				<Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1.5 h-9 shadow-sm">
					<Plus className="size-4" />
					Buat Proses Gaji Baru
				</Button>
			</div>

			{/* Top Action & Filter Toolbar */}
			<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-card p-3 rounded-lg border shadow-xs">
				<div className="flex flex-wrap items-center gap-2.5">
					<span className="text-xs font-semibold text-foreground mr-1 hidden sm:inline">
						Filter &amp; Pencarian Batch:
					</span>
					<span className="sr-only">Filter &amp; Pencarian Batch</span>

					<PeriodeSelect
						label="Periode Batch"
						month={filterMonth}
						year={filterYear}
						onMonthChange={(m) =>
							handlePeriodeChange(filterYear === "ALL" ? String(new Date().getFullYear()) : filterYear, m)
						}
						onYearChange={(y) => handlePeriodeChange(y, filterMonth === "ALL" ? "" : filterMonth)}
						allowAll
						size="sm"
					/>

					<div className="flex items-center gap-1.5">
						<span className="text-xs font-semibold text-foreground mr-1">Status Payroll:</span>
						<span className="sr-only">Status Payroll</span>
						<Select
							value={currentStatus}
							onValueChange={(v) => handleFilterChange("status", !v || v === "ALL" ? undefined : v)}
						>
							<SelectTrigger
								className={cn(
									"w-56 h-9 text-xs bg-background transition-colors",
									currentStatus !== "ALL" && currentStatus
										? "border-primary/50 text-foreground font-medium bg-primary/5 ring-1 ring-primary/20"
										: "border-input text-foreground hover:border-border",
								)}
								aria-label="Filter Status"
							>
								<SelectValue placeholder="Semua Status">
									{currentStatus && currentStatus !== "ALL" ? (
										<span className="flex items-center gap-1.5 truncate">
											<span
												className={cn(
													"size-2 rounded-full shrink-0",
													STATUS_DOT[currentStatus as StatusBatch] ?? "bg-primary",
												)}
											/>
											<span className="truncate">{selectedStatusLabel}</span>
										</span>
									) : (
										<span className="flex items-center gap-1.5 text-foreground">
											<span className="size-2 rounded-full bg-muted-foreground/60 shrink-0" />
											<span>Semua Status</span>
										</span>
									)}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ALL" className="text-xs">
									<span className="flex items-center gap-2">
										<span className="size-2 rounded-full bg-muted-foreground/60 shrink-0" />
										<span>Semua Status</span>
									</span>
								</SelectItem>
								{STATUS_OPTIONS.map((o) => (
									<SelectItem key={o.value} value={o.value} className="text-xs">
										<span className="flex items-center gap-2">
											<span
												className={cn(
													"size-2 rounded-full shrink-0",
													STATUS_DOT[o.value as StatusBatch] ?? "bg-primary",
												)}
											/>
											<span>{o.label}</span>
										</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => list.refetch()}
						disabled={list.isPending}
						className="h-9 text-xs font-semibold gap-1.5"
						title="Segarkan Data"
					>
						<RefreshCw className={`size-3.5 ${list.isPending ? "animate-spin" : ""}`} />
						Refresh
					</Button>

					{hasActiveFilter && (
						<Button
							variant="ghost"
							size="sm"
							onClick={resetAll}
							className="h-9 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors gap-1 px-2"
							title="Reset Filter"
						>
							<RotateCcw className="size-3" />
							Reset
						</Button>
					)}
				</div>

				<div className="flex items-center gap-2">
					<span className="text-xs text-muted-foreground font-mono bg-muted/60 px-2.5 py-1 rounded border border-border/50">
						{pageView.total} Batch
					</span>
				</div>
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
