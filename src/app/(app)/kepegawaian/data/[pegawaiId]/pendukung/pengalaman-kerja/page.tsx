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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { PageResultPagePengalamanKerjaQuery, PengalamanKerjaQuery } from "@/types/profil/pengalaman-kerja";
import { PengalamanKerjaFormSheet } from "./pengalaman-kerja-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (W2: No | Perusahaan | Jabatan | Lokasi | Periode | Aksi) ──

const PENGALAMAN_KOLOM: Column<PengalamanKerjaQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "namaPerusahaan",
		header: "Perusahaan",
		primary: true,
		cell: (row) => val(row.namaPerusahaan),
	},
	{ id: "jabatan", header: "Jabatan", cell: (row) => val(row.jabatan) },
	{ id: "lokasi", header: "Lokasi", cell: (row) => val(row.lokasi) },
	{
		id: "periode",
		header: "Periode",
		cell: (row) => {
			const masuk = row.tahunMasuk ? String(row.tahunMasuk) : "";
			const keluar = row.tahunKeluar ? String(row.tahunKeluar) : "";
			if (keluar) return masuk ? `${masuk}–${keluar}` : keluar;
			return masuk ? `${masuk}–sekarang` : "—";
		},
	},
];

// ── Toolbar (W3: namaPerusahaan + jabatan, keduanya teks) ──

function PengalamanToolbar({
	namaPerusahaan,
	jabatan,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	namaPerusahaan: string;
	jabatan: string;
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[
				{ name: "namaPerusahaan", label: "Perusahaan" },
				{ name: "jabatan", label: "Jabatan" },
			]}
			values={{ namaPerusahaan, jabatan }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Pengalaman
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function PengalamanKerjaPage() {
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

	// Session cache layout (queryKey sama → satu fetch) — nik gratis untuk biodataId (P6)
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
	const nik = sessionQuery.data?.nik;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const namaPerusahaan = sp.get("namaPerusahaan") ?? "";
	const jabatan = sp.get("jabatan") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(namaPerusahaan || jabatan);

	const query = useQuery({
		queryKey: ["profil-pengalaman-kerja", pegawaiId, page, size, namaPerusahaan, jabatan, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (namaPerusahaan) params.namaPerusahaan = namaPerusahaan;
			if (jabatan) params.jabatan = jabatan;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pengalaman-kerja?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pengalaman kerja");
			const body = (await res.json()) as PageResultPagePengalamanKerjaQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as PengalamanKerjaQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pengalaman-kerja?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pengalaman-kerja`);
	};

	const columns = PENGALAMAN_KOLOM.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: PengalamanKerjaQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/admin/profil/pengalaman-kerja/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Pengalaman kerja berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-pengalaman-kerja", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<PengalamanKerjaQuery>
				toolbar={
					<PengalamanToolbar
						namaPerusahaan={namaPerusahaan}
						jabatan={jabatan}
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
				emptyMessage="Belum ada data pengalaman kerja"
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
			<PengalamanKerjaFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			{/* Kartu Lampiran — menempel ke baris terpilih; URL dari spike B (P5, bentuk /lampiran/{refId}/list) */}
			{selectedRow ? (
				<div className="mt-4">
					<LampiranCard
						ref="PROFIL_PENGALAMAN_KERJA"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pengalaman-kerja/lampiran/${selectedRow.id}/list`}
						uploadUrl="/api/proxy/admin/profil/pengalaman-kerja/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/pengalaman-kerja/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pengalaman-kerja/lampiran/${id}/file`}
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
				itemLabel="pengalaman kerja"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
