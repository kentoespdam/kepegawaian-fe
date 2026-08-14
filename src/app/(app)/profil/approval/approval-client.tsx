"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { cn } from "@/lib/utils";
import type {
	PageResultPageProfileUpdateQuery,
	ProfileUpdateQuery,
	SingleResultProfilUpdateDetailObject,
	StatusUpdateProfil,
} from "@/types/profil/profil-update";

const STATUS_LABEL: Record<StatusUpdateProfil, string> = {
	PENDING: "Menunggu",
	APPROVED: "Disetujui",
	REJECT: "Ditolak",
};

type FieldDef = { key: string; label: string };
const FIELD_MAP: Record<string, FieldDef[]> = {
	BIODATA: [
		{ key: "nik", label: "NIK" },
		{ key: "nama", label: "Nama" },
		{ key: "jenisKelamin", label: "Jenis Kelamin" },
		{ key: "tempatLahir", label: "Tempat Lahir" },
		{ key: "tanggalLahir", label: "Tanggal Lahir" },
		{ key: "alamat", label: "Alamat" },
		{ key: "telp", label: "Telp" },
		{ key: "agama", label: "Agama" },
		{ key: "ibuKandung", label: "Ibu Kandung" },
		{ key: "pendidikanTerakhirId", label: "Pend. Terakhir" },
		{ key: "golonganDarah", label: "Gol. Darah" },
		{ key: "statusKawin", label: "Status Kawin" },
		{ key: "notes", label: "Catatan" },
	],
	PENDIDIKAN: [
		{ key: "jenjangPendidikan", label: "Jenjang" },
		{ key: "institusi", label: "Institusi" },
		{ key: "jurusan", label: "Jurusan" },
		{ key: "kota", label: "Kota" },
		{ key: "gelarDepan", label: "Gelar Depan" },
		{ key: "gelarBelakang", label: "Gelar Belakang" },
		{ key: "tahunMasuk", label: "Tahun Masuk" },
		{ key: "gpa", label: "IPK" },
		{ key: "isLulus", label: "Lulus" },
		{ key: "tahunLulus", label: "Tahun Lulus" },
		{ key: "isLatest", label: "Pendidikan Terakhir" },
	],
	PELATIHAN: [
		{ key: "jenisPelatihanId", label: "Jenis Pelatihan" },
		{ key: "nama", label: "Nama" },
		{ key: "lembaga", label: "Lembaga" },
		{ key: "tanggalMulai", label: "Tgl Mulai" },
		{ key: "tanggalSelesai", label: "Tgl Selesai" },
		{ key: "lulus", label: "Lulus" },
		{ key: "nilai", label: "Nilai" },
		{ key: "ikatanDinas", label: "Ikatan Dinas" },
		{ key: "tanggalAkhirIkatan", label: "Tgl Akhir Ikatan" },
		{ key: "notes", label: "Catatan" },
	],
	KELUARGA: [
		{ key: "nama", label: "Nama" },
		{ key: "nik", label: "NIK" },
		{ key: "jenisKelamin", label: "Jenis Kelamin" },
		{ key: "agama", label: "Agama" },
		{ key: "hubunganKeluarga", label: "Hubungan" },
		{ key: "tempatLahir", label: "Tempat Lahir" },
		{ key: "tanggalLahir", label: "Tgl Lahir" },
		{ key: "tanggungan", label: "Tanggungan" },
		{ key: "statusKawin", label: "Status Kawin" },
		{ key: "pendidikanId", label: "Pendidikan" },
		{ key: "statusPendidikan", label: "Status Pendidikan" },
		{ key: "notes", label: "Catatan" },
	],
	KEAHLIAN: [
		{ key: "jenisKeahlian", label: "Jenis Keahlian" },
		{ key: "kualifikasi", label: "Tingkat Kemampuan" },
		{ key: "sertifikasi", label: "Sertifikasi" },
		{ key: "institusi", label: "Institusi" },
		{ key: "tahun", label: "Tahun" },
		{ key: "masaBerlaku", label: "Masa Berlaku" },
	],
	KARTU_IDENTITAS: [
		{ key: "jenisKartuId", label: "Jenis Kartu" },
		{ key: "nomorKartu", label: "Nomor Kartu" },
		{ key: "tanggalTerima", label: "Tgl Terima" },
		{ key: "tanggalExpired", label: "Masa Berlaku" },
		{ key: "notes", label: "Catatan" },
	],
	PENGALAMAN_KERJA: [
		{ key: "namaPerusahaan", label: "Nama Perusahaan" },
		{ key: "typePerusahaan", label: "Jenis" },
		{ key: "jabatan", label: "Jabatan" },
		{ key: "lokasi", label: "Lokasi" },
		{ key: "tahunMasuk", label: "Tahun Masuk" },
		{ key: "tahunKeluar", label: "Tahun Keluar" },
		{ key: "notes", label: "Catatan" },
	],
	LAMPIRAN: [
		{ key: "fileName", label: "File" },
		{ key: "notes", label: "Catatan" },
	],
};

function StatusBadge({ status }: { status?: StatusUpdateProfil }) {
	if (!status) return null;
	return (
		<Badge
			variant="outline"
			className={
				status === "PENDING"
					? "text-warning border-warning/30 bg-warning/5"
					: status === "APPROVED"
						? "text-success border-success/30 bg-success/10"
						: "text-destructive border-destructive/30 bg-destructive/10"
			}
		>
			{STATUS_LABEL[status]}
		</Badge>
	);
}

function resolveValue(obj: Record<string, unknown>, key: string): unknown {
	// FK convention: key berakhiran 'Id' → coba key.replace(/Id$/, 'Nama')
	if (key.endsWith("Id")) {
		const nameKey = key.replace(/Id$/, "Nama");
		const nameVal = obj[nameKey];
		if (nameVal !== null && nameVal !== undefined) return nameVal;
	}
	// Nilai berupa object (mis. jenjangPendidikan = { id, nama }) → ambil .nama
	const val = obj[key];
	if (val !== null && typeof val === "object" && !Array.isArray(val)) {
		const nested = (val as Record<string, unknown>).nama ?? (val as Record<string, unknown>).name;
		if (nested !== undefined) return nested;
	}
	return val;
}

const COLUMNS: Column<ProfileUpdateQuery>[] = [
	{ id: "nama", header: "Nama", primary: true, cell: (r) => r.nama ?? "—" },
	{ id: "nipam", header: "NIPAM", cell: (r) => r.nipam ?? "—" },
	{ id: "jabatan", header: "Jabatan", cell: (r) => r.jabatan ?? "—" },
	{ id: "tableName", header: "Tabel", cell: (r) => r.tableName ?? "—" },
	{ id: "actionType", header: "Aksi", cell: (r) => r.actionType ?? "—" },
	{ id: "reqDate", header: "Diajukan", cell: (r) => (r.reqDate ? new Date(r.reqDate).toLocaleString("id-ID") : "—") },
	{ id: "approvalStatus", header: "Status", cell: (r) => <StatusBadge status={r.approvalStatus} /> },
];

export function ApprovalClient({ pegawaiId }: { pegawaiId: number | null }) {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const { permissions } = useAuth();
	const canApprove = hasPermission(permissions, PERMISSION.PROFIL_APPROVE);

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nama = sp.get("nama") ?? "";
	const nipam = sp.get("nipam") ?? "";
	const status = sp.get("status") ?? "PENDING";

	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/profil/approval?${p.toString()}`);
	};

	const query = useQuery({
		queryKey: ["profil-update", page, size, nama, nipam, status],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), approvalStatus: status };
			if (nama) params.nama = nama;
			if (nipam) params.nipam = nipam;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/profil-update?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat antrian approval");
			const body = (await res.json()) as PageResultPageProfileUpdateQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const detailQuery = useQuery({
		queryKey: ["profil-update-detail", selectedId],
		queryFn: async () => {
			if (selectedId == null) return null;
			const res = await fetch(`/api/proxy/profil/profil-update/${selectedId}`);
			if (!res.ok) throw new Error("Gagal memuat detail");
			const body = (await res.json()) as SingleResultProfilUpdateDetailObject;
			return body.data;
		},
		enabled: selectedId != null,
	});

	const approvalMutation = useMutation({
		mutationFn: async ({ id, approval }: { id: number; approval: StatusUpdateProfil }) => {
			const res = await fetch(`/api/proxy/profil/profil-update/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ approval, pegawaiId }),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal memproses approval");
			}
		},
		onSuccess: (_d, { approval }) => {
			toast.success(approval === "APPROVED" ? "Perubahan disetujui" : "Perubahan ditolak");
			setSelectedId(null);
			qc.invalidateQueries({ queryKey: ["profil-update"] });
		},
		onError: (e: Error) => setActionError(e.message),
	});

	const detail = detailQuery.data;
	const fields = FIELD_MAP[detail?.profileUpdate?.tableName ?? ""] ?? [];
	const prev = (detail?.previousRevision ?? {}) as Record<string, unknown>;
	const latest = (detail?.latestRevision ?? {}) as Record<string, unknown>;

	const diffRows = fields.map(({ key, label }) => ({
		label,
		before: resolveValue(prev, key),
		after: resolveValue(latest, key),
	}));

	const handleApprove = (approval: "APPROVED" | "REJECT") => {
		if (selectedId == null) return;
		setActionError(null);
		approvalMutation.mutate({ id: selectedId, approval });
	};

	const hasActive = !!(nama || nipam || status !== "PENDING");

	return (
		<>
			<DataTable<ProfileUpdateQuery>
				toolbar={
					<DataTableToolbar
						searchFields={[
							{ name: "nama", label: "Nama" },
							{ name: "nipam", label: "NIPAM" },
						]}
						values={{ nama, nipam }}
						onFilterChange={(key, val) => nav({ [key]: val, page: "1" })}
						hasActive={hasActive}
						onReset={() => router.replace("/profil/approval?status=PENDING")}
					>
						{(
							[
								{ value: "PENDING", label: "Menunggu" },
								{ value: "APPROVED", label: "Disetujui" },
								{ value: "REJECT", label: "Ditolak" },
							] as const
						).map((s) => (
							<Button
								key={s.value}
								variant={status === s.value ? "secondary" : "outline"}
								size="sm"
								onClick={() => nav({ status: s.value === "PENDING" ? undefined : s.value, page: "1" })}
							>
								{s.label}
							</Button>
						))}
					</DataTableToolbar>
				}
				columns={COLUMNS}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => setSelectedId(item.id ?? null)}
				getRowId={(item) => String(item.id ?? "")}
				emptyMessage="Tidak ada antrian perubahan profil"
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

			<Dialog
				open={selectedId != null}
				onOpenChange={(v) => {
					if (!v) {
						setSelectedId(null);
						setActionError(null);
					}
				}}
			>
				<DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-3xl">
					<DialogHeader className="shrink-0 border-b px-4 py-3">
						<DialogTitle>Detail Perubahan Profil</DialogTitle>
					</DialogHeader>
					<div className="flex-1 overflow-y-auto p-4">
						{detailQuery.isPending && <p className="text-sm text-muted-foreground">Memuat...</p>}
						{detailQuery.isError && (
							<p className="text-sm text-destructive">
								Gagal memuat detail.{" "}
								<Button variant="link" size="sm" onClick={() => detailQuery.refetch()} className="h-auto p-0">
									Coba lagi
								</Button>
							</p>
						)}
						{detail && (
							<>
								{/* Header info */}
								<div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-3">
									<div>
										<p className="text-xs uppercase text-muted-foreground">Nama</p>
										<p className="font-medium">{detail.profileUpdate?.nama ?? "—"}</p>
									</div>
									<div>
										<p className="text-xs uppercase text-muted-foreground">NIPAM</p>
										<p className="font-medium">{detail.profileUpdate?.nipam ?? "—"}</p>
									</div>
									<div>
										<p className="text-xs uppercase text-muted-foreground">Jabatan</p>
										<p className="font-medium">{detail.profileUpdate?.jabatan ?? "—"}</p>
									</div>
									<div>
										<p className="text-xs uppercase text-muted-foreground">Tabel</p>
										<p className="font-medium">{detail.profileUpdate?.tableName ?? "—"}</p>
									</div>
									<div>
										<p className="text-xs uppercase text-muted-foreground">Aksi</p>
										<p className="font-medium">{detail.profileUpdate?.actionType ?? "—"}</p>
									</div>
									<div>
										<p className="text-xs uppercase text-muted-foreground">Diajukan</p>
										<p className="font-medium">
											{detail.profileUpdate?.reqDate
												? new Date(detail.profileUpdate.reqDate).toLocaleString("id-ID")
												: "—"}
										</p>
									</div>
								</div>

								{/* Diff table */}
								{diffRows.length === 0 ? (
									<p className="text-sm italic text-muted-foreground">Tidak ada field yang berubah</p>
								) : (
									<div className="overflow-x-auto rounded-lg border">
										<table className="w-full text-sm">
											<thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
												<tr>
													<th className="px-3 py-2">Field</th>
													<th className="px-3 py-2">Sebelum</th>
													<th className="px-3 py-2">Sesudah</th>
												</tr>
											</thead>
											<tbody>
												{diffRows.map((row) => {
													const changed = row.before !== row.after;
													return (
														<tr key={row.label} className={cn("border-t", changed && "bg-warning/10")}>
															<td className="px-3 py-1.5 font-mono text-xs">{row.label}</td>
															<td className="px-3 py-1.5">
																{row.before == null || row.before === "" ? "—" : String(row.before)}
															</td>
															<td className="px-3 py-1.5 font-medium">
																{row.after == null || row.after === "" ? "—" : String(row.after)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								)}
							</>
						)}
					</div>
					{/* Footer actions */}
					<div className="flex shrink-0 items-center justify-between gap-2 border-t px-4 py-3">
						<p className="text-sm text-destructive">{actionError}</p>
						<div className="flex gap-2">
							{canApprove && detail?.profileUpdate?.approvalStatus === "PENDING" && (
								<>
									<Button
										variant="destructive"
										onClick={() => handleApprove("REJECT")}
										disabled={approvalMutation.isPending}
									>
										Tolak
									</Button>
									<Button onClick={() => handleApprove("APPROVED")} disabled={approvalMutation.isPending}>
										Setujui
									</Button>
								</>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
