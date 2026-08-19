"use client";

import { Calendar, CalendarOff, Clock, FileCheck2, Filter, Plus, UserMinus } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Button } from "@/components/ui/button";
import { TERMINASI_TABS, useTerminasiTable } from "@/hooks/useTerminasiTable";
import { formatDate } from "@/lib/utils";
import type { PegawaiResponse, RiwayatTerminasiQuery } from "@/types/kepegawaian/riwayat";
import { TerminasiFormSheet } from "./terminasi-form-sheet";

export function TerminasiClient() {
	const {
		tab,
		page,
		size,
		sortBy,
		sortDir,
		tahunPensiun,
		alasanTerminasiId,
		query,
		pageView,
		alasanOptions,
		alasanLoading,
		nav,
	} = useTerminasiTable();

	const [sheetOpen, setSheetOpen] = useState(false);
	const [prefillPegawai, setPrefillPegawai] = useState<PegawaiResponse | null>(null);

	const handleOpenForm = (pegawai?: PegawaiResponse) => {
		setPrefillPegawai(pegawai ?? null);
		setSheetOpen(true);
	};

	const calonPensiunColumns = [
		{
			id: "nipam",
			header: "NIPAM",
			sortable: true,
			primary: true,
			cell: (i: PegawaiResponse) => (
				<span className="font-semibold text-foreground tabular-nums">{String(i.nipam ?? "")}</span>
			),
		},
		{
			id: "nama",
			header: "Nama Pegawai",
			sortable: true,
			cell: (i: PegawaiResponse) => (
				<span className="font-medium text-foreground">{String(i.biodata?.nama ?? "")}</span>
			),
		},
		{
			id: "organisasi",
			header: "Organisasi",
			cell: (i: PegawaiResponse) => String(i.organisasi?.nama ?? "-"),
		},
		{
			id: "jabatan",
			header: "Jabatan",
			cell: (i: PegawaiResponse) => String(i.jabatan?.nama ?? "-"),
		},
		{
			id: "tanggal",
			header: "Tgl. Pensiun",
			cell: (i: PegawaiResponse) => (
				<span className="inline-flex items-center gap-1.5 font-medium text-foreground tabular-nums">
					<Calendar className="size-3.5 text-muted-foreground" />
					{formatDate(i.tmtPensiun)}
				</span>
			),
		},
		{
			id: "aksi",
			header: "Aksi",
			cell: (i: PegawaiResponse) => (
				<Button
					type="button"
					variant="outline"
					size="xs"
					onClick={() => handleOpenForm(i)}
					title="Proses Terminasi Pegawai Ini"
				>
					<UserMinus className="size-3.5 mr-1 text-destructive" />
					Terminasi
				</Button>
			),
		},
	] as const;

	const sudahTerminasiColumns = [
		{
			id: "nipam",
			header: "NIPAM",
			sortable: true,
			primary: true,
			cell: (i: RiwayatTerminasiQuery) => (
				<span className="font-semibold text-foreground tabular-nums">{String(i.nipam ?? "")}</span>
			),
		},
		{
			id: "nama",
			header: "Nama Pegawai",
			sortable: true,
			cell: (i: RiwayatTerminasiQuery) => <span className="font-medium text-foreground">{String(i.nama ?? "")}</span>,
		},
		{
			id: "organisasi",
			header: "Organisasi",
			cell: (i: RiwayatTerminasiQuery) => String(i.namaOrganisasi ?? "-"),
		},
		{
			id: "jabatan",
			header: "Jabatan",
			cell: (i: RiwayatTerminasiQuery) => String(i.namaJabatan ?? "-"),
		},
		{
			id: "tanggal",
			header: "Tgl. Terminasi",
			cell: (i: RiwayatTerminasiQuery) => (
				<span className="inline-flex items-center gap-1.5 font-medium text-foreground tabular-nums">
					<Calendar className="size-3.5 text-muted-foreground" />
					{formatDate(i.tanggalTerminasi)}
				</span>
			),
		},
		{
			id: "alasan",
			header: "Alasan Terminasi",
			cell: (i: RiwayatTerminasiQuery) => (
				<span className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground">
					{String(i.alasanTerminasi?.nama ?? "-")}
				</span>
			),
		},
	] as const;

	const columns = tab === "calon-pensiun" ? calonPensiunColumns : sudahTerminasiColumns;

	return (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<CalendarOff className="size-5" />
					</div>
					<div>
						<h1 className="text-xl font-bold text-foreground">Terminasi &amp; Pensiun Pegawai</h1>
						<p className="text-xs text-muted-foreground">
							Monitoring proyeksi masa pensiun (MPP) dan riwayat pegawai purna tugas
						</p>
					</div>
				</div>
				<div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground shadow-xs">
					<span className="size-2 rounded-full bg-primary" />
					<span>Total: {pageView.total} Data</span>
				</div>
			</div>

			{/* Tab Switcher */}
			<div className="flex rounded-xl border border-border bg-muted/40 p-1">
				{TERMINASI_TABS.map((t) => {
					const isActive = tab === t.id;
					const Icon = t.id === "calon-pensiun" ? Clock : FileCheck2;
					return (
						<button
							key={t.id}
							type="button"
							onClick={() => nav({ tab: t.id, page: "1" })}
							className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
								isActive
									? "bg-card text-foreground font-semibold shadow-xs border border-border/50"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Icon className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
							<span>{t.label}</span>
						</button>
					);
				})}
			</div>

			{/* Filter & Toolbar Bar */}
			<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center gap-2">
						<label
							htmlFor="tahun-filter"
							className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
						>
							<Calendar className="size-3.5 text-primary" />
							{tab === "calon-pensiun" ? "Tahun Pensiun" : "Tahun Terminasi"}
						</label>
						<select
							id="tahun-filter"
							value={tahunPensiun}
							onChange={(e) => nav({ tahunPensiun: e.target.value, page: "1" })}
							className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
						>
							{Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 2 + i)).map((y) => (
								<option key={y} value={y}>
									{y}
								</option>
							))}
						</select>
					</div>

					{tab === "terminasi" && (
						<div className="flex items-center gap-2">
							<label
								htmlFor="alasan-filter"
								className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
							>
								<Filter className="size-3.5 text-primary" />
								Alasan Terminasi
							</label>
							<select
								id="alasan-filter"
								value={alasanTerminasiId ?? ""}
								onChange={(e) => nav({ alasanTerminasiId: e.target.value || undefined, page: "1" })}
								disabled={alasanLoading}
								className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground shadow-xs min-w-44 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
							>
								<option value="">{alasanLoading ? "Memuat..." : "Semua Alasan"}</option>
								{alasanOptions.map((a) => (
									<option key={a.value} value={a.value}>
										{a.label}
									</option>
								))}
							</select>
						</div>
					)}
				</div>

				<div>
					<Button type="button" onClick={() => handleOpenForm()}>
						<Plus className="size-4 mr-1.5" />
						Tambah Terminasi
					</Button>
				</div>
			</div>

			{/* Main Data Table */}
			<DataTable
				columns={columns as never}
				data={(pageView.rows as unknown as (PegawaiResponse | RiwayatTerminasiQuery)[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				sortBy={sortBy}
				sortDirection={sortDir}
				onSort={(key) => {
					if (sortBy === key) nav({ sortDirection: sortDir === "asc" ? "desc" : "asc" });
					else nav({ sortBy: key, sortDirection: "asc" });
				}}
				getRowId={(i) => String((i as { id?: number }).id ?? "")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => nav({ page: String(p) })}
						onSizeChange={(s) => nav({ size: String(s), page: "1" })}
					/>
				}
			/>

			{/* Form Sheet */}
			<TerminasiFormSheet
				isOpen={sheetOpen}
				onClose={() => {
					setSheetOpen(false);
					setPrefillPegawai(null);
				}}
				initialPegawai={prefillPegawai}
			/>
		</div>
	);
}
