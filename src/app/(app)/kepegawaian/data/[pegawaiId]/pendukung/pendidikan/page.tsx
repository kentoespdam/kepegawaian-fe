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
import { useFkOptions } from "@/hooks/useFkOptions";
import { useRoles } from "@/hooks/useRoles";
// ponytail: import modul langsung — verifySession server-only
import { can, forbidden } from "@/lib/auth/can";
import { fromPage, toApiParams } from "@/lib/paging";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { PageResultPagePendidikanQuery, PendidikanQuery } from "@/types/profil/pendidikan";
import { PendidikanFormSheet } from "./pendidikan-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (D1 terkunci: No | Jenjang | Institusi | Jurusan | Kota | Tahun | IPK | Gelar | Status | Aksi) ──

const PENDIDIKAN_COLUMNS: Column<PendidikanQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "jenjang",
		header: "Jenjang",
		cell: (row) => row.jenjangPendidikan?.nama ?? val(row.jenjangId),
	},
	{
		id: "institusi",
		header: "Institusi",
		primary: true,
		cell: (row) => val(row.institusi),
	},
	{ id: "jurusan", header: "Jurusan", cell: (row) => val(row.jurusan) },
	{ id: "kota", header: "Kota", cell: (row) => val(row.kota) },
	{
		id: "tahun",
		header: "Tahun",
		cell: (row) => {
			const masuk = row.tahunMasuk ? String(row.tahunMasuk) : "";
			const lulus = row.tahunLulus ? String(row.tahunLulus) : "";
			if (masuk && lulus) return `${masuk}–${lulus}`;
			return masuk || lulus || "—";
		},
	},
	{ id: "ipk", header: "IPK", cell: (row) => (row.gpa != null ? String(row.gpa) : "—") },
	{
		id: "gelar",
		header: "Gelar",
		cell: (row) => {
			const gelar = [row.gelarDepan, row.gelarBelakang].filter(Boolean).join(" ");
			return gelar || "—";
		},
	},
	{
		id: "status",
		header: "Status",
		cell: (row) => (
			<span className="inline-flex items-center gap-1.5">
				{row.disetujui ? (
					<Badge variant="outline" className="text-success border-success/30 bg-success/10">
						Disetujui
					</Badge>
				) : (
					<Badge variant="outline">Belum</Badge>
				)}
				{row.isLatest ? <Badge>Terakhir</Badge> : null}
			</span>
		),
	},
];

// ── Toolbar (D2 terkunci: institusi teks + jenjangId combobox) ──

function PendidikanToolbar({
	institusi,
	jenjangId,
	jenjangOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	institusi: string;
	jenjangId: string;
	jenjangOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "institusi", label: "Institusi" }]}
			fkSources={[{ field: "jenjangId", entity: "jenjang-pendidikan", label: "Jenjang" }]}
			fkOptions={{ jenjangId: jenjangOpts }}
			values={{ institusi, jenjangId }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Pendidikan
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function PendidikanPage() {
	const roles = useRoles();
	if (!can(roles, "view", "pegawai")) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const canCreate = can(roles, "create", "pegawai");
	const canUpdate = can(roles, "update", "pegawai");
	const canDelete = can(roles, "delete", "pegawai");

	const jenjangOpts = useFkOptions("jenjang-pendidikan");

	// Session cache layout (queryKey sama → satu fetch) — nik gratis untuk biodataId (P6)
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
	const institusi = sp.get("institusi") ?? "";
	const jenjangId = sp.get("jenjangId") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(institusi || jenjangId);

	const query = useQuery({
		queryKey: ["profil-pendidikan", pegawaiId, page, size, institusi, jenjangId, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (institusi) params.institusi = institusi;
			if (jenjangId) params.jenjangId = jenjangId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pendidikan?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data pendidikan");
			const body = (await res.json()) as PageResultPagePendidikanQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as PendidikanQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pendidikan?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pendidikan`);
	};

	const columns = PENDIDIKAN_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: PendidikanQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/profil/pendidikan/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Pendidikan berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-pendidikan", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<PendidikanQuery>
				toolbar={
					<PendidikanToolbar
						institusi={institusi}
						jenjangId={jenjangId}
						jenjangOpts={jenjangOpts}
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
				emptyMessage="Belum ada data pendidikan"
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
			<PendidikanFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			{/* Kartu Lampiran (E) — menempel ke baris terpilih; URL dari spike B (P5) */}
			{selectedRow ? (
				<div className="mt-4">
					<LampiranCard
						ref="PROFIL_PENDIDIKAN"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pendidikan/lampiran/${selectedRow.id}/list`}
						uploadUrl="/api/proxy/profil/pendidikan/lampiran"
						deleteUrl={(id) => `/api/proxy/profil/pendidikan/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pendidikan/lampiran/${id}/file`}
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
				itemLabel="pendidikan"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
