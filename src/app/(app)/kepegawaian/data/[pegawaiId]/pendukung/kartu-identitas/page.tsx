"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { LampiranCard } from "@/components/lampiran-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFkOptions } from "@/hooks/useFkOptions";
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { KartuIdentitasQuery, PageResultPageKartuIdentitasQuery } from "@/types/profil/kartu-identitas";
import { KartuIdentitasFormSheet } from "./kartu-identitas-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ponytail: komputasi kadaluarsa murni klien — banding string YYYY-MM-DD (format date BE), tanpa field status
function isExpired(tanggalExpired: string | undefined): boolean {
	if (!tanggalExpired) return false;
	// pakai tanggal lokal, bukan UTC — Indonesia UTC+7, dini hari UTC masih hari kemarin
	const now = new Date();
	const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
	return tanggalExpired < today;
}

// ── Kolom tabel (KI1: No | Jenis Kartu | Nomor | Tgl Terima | Masa Berlaku | Aksi) ──

const KARTU_COLUMNS: Column<KartuIdentitasQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "jenisKartu",
		header: "Jenis Kartu",
		primary: true,
		cell: (row) => row.jenisKartuNama ?? val(row.jenisKartuId),
	},
	{ id: "nomorKartu", header: "Nomor", cell: (row) => val(row.nomorKartu) },
	{ id: "tanggalTerima", header: "Tgl Terima", cell: (row) => formatDate(row.tanggalTerima) },
	{
		id: "masaBerlaku",
		header: "Masa Berlaku",
		cell: (row) => (
			<div className="flex items-center gap-2">
				<span>{formatDate(row.tanggalExpired)}</span>
				{isExpired(row.tanggalExpired) && (
					<Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">
						Kadaluarsa
					</Badge>
				)}
			</div>
		),
	},
];

// ── Toolbar (KI2: jenisKartuId combobox + nomorKartu teks) ──

function KartuToolbar({
	jenisKartuId,
	nomorKartu,
	jenisKartuOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	jenisKartuId: string;
	nomorKartu: string;
	jenisKartuOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorKartu", label: "Nomor" }]}
			fkSources={[{ field: "jenisKartuId", entity: "jenis-kitas", label: "Jenis Kartu" }]}
			fkOptions={{ jenisKartuId: jenisKartuOpts }}
			values={{ jenisKartuId, nomorKartu }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Kartu
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function KartuIdentitasPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenisKartuOpts = useFkOptions("jenis-kitas");

	// Session cache layout (queryKey sama → satu fetch) — nik gratis (P6)
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
	const nik = sessionQuery.data?.nik;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const jenisKartuId = sp.get("jenisKartuId") ?? "";
	const nomorKartu = sp.get("nomorKartu") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(jenisKartuId || nomorKartu);

	const query = useQuery({
		queryKey: ["profil-kartu-identitas", pegawaiId, page, size, jenisKartuId, nomorKartu, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (jenisKartuId) params.jenisKartuId = jenisKartuId;
			if (nomorKartu) params.nomorKartu = nomorKartu;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/kartu-identitas?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data kartu identitas");
			const body = (await res.json()) as PageResultPageKartuIdentitasQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as KartuIdentitasQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/kartu-identitas?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/kartu-identitas`);
	};

	const columns = KARTU_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: KartuIdentitasQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/admin/profil/kartu-identitas/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Kartu identitas berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-kartu-identitas", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<KartuIdentitasQuery>
				toolbar={
					<KartuToolbar
						jenisKartuId={jenisKartuId}
						nomorKartu={nomorKartu}
						jenisKartuOpts={jenisKartuOpts}
						hasActive={hasActive}
						canCreate={canCreate}
						onFilterChange={onFilterChange}
						onReset={onReset}
						onTambah={() => {
							setEditingId(null);
							setIsFormOpen(true);
						}}
					/>
				}
				columns={columns}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => nav({ sel: String(item.id ?? "") })}
				selectedRowId={selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canUpdate ? (item) => setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data kartu identitas"
				isFiltered={hasActive}
				onResetFilter={onReset}
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
			<KartuIdentitasFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			{/* Kartu Lampiran — list pola /{refId}/lampiran (spike B, P5) */}
			{selectedRow ? (
				<div className="mt-4">
					<LampiranCard
						ref="KARTU_IDENTITAS"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/kartu-identitas/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/admin/profil/kartu-identitas/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/kartu-identitas/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/kartu-identitas/lampiran/${id}/file`}
						hideUpload={!canUpdate}
						hideDelete={!canDelete}
					/>
				</div>
			) : null}
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="kartu identitas"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
