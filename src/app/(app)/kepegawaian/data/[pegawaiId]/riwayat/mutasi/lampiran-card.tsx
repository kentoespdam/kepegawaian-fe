"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { JenisSk } from "@/types/_shared";
import type { LampiranSkQuery, ListResultLampiranSkQuery } from "@/types/kepegawaian/lampiran";
import type { RiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";

interface Props {
	selectedRow: RiwayatMutasiQuery | null;
}

export function LampiranCard({ selectedRow }: Props) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);
	const [uploadNotes, setUploadNotes] = useState("");
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [viewerFile, setViewerFile] = useState<{ url: string; name: string; mimeType?: string } | null>(null);

	const ref = selectedRow?.skMutasi?.jenisSk as JenisSk | undefined;
	const refId = selectedRow?.skMutasi?.id;
	const skLabel = selectedRow?.skMutasi?.nomorSk ?? "";

	const lampiranQuery = useQuery({
		queryKey: ["lampiran", ref, refId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/kepegawaian/lampiran/list/${ref}/${refId}`);
			if (!res.ok) throw new Error("Gagal memuat lampiran");
			const body = (await res.json()) as ListResultLampiranSkQuery;
			return body.data as LampiranSkQuery[];
		},
		enabled: !!ref && !!refId,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const handleUpload = async () => {
		const file = fileRef.current?.files?.[0];
		if (!file || !ref || !refId) return;
		setIsUploading(true);
		try {
			const fd = new FormData();
			fd.append("ref", ref);
			fd.append("refId", String(refId));
			fd.append("fileName", file);
			if (uploadNotes) fd.append("notes", uploadNotes);
			// SPIKE issue 7eo5.5: proxy.ts rewrite — jangan set Content-Type, biar browser set boundary
			const res = await fetch("/api/proxy/kepegawaian/lampiran", { method: "POST", body: fd });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Gagal mengunggah");
			}
			toast.success("Lampiran berhasil diunggah");
			qc.invalidateQueries({ queryKey: ["lampiran", ref, refId] });
			if (fileRef.current) fileRef.current.value = "";
			setUploadNotes("");
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal mengunggah");
		} finally {
			setIsUploading(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteId || !ref || !refId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/kepegawaian/lampiran/${ref}/${refId}/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Lampiran berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["lampiran", ref, refId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e;
		}
	};

	const handleView = (item: LampiranSkQuery) => {
		if (!ref || !refId) return;
		const url = `/api/proxy/kepegawaian/lampiran/file/${ref}/${item.id}`;
		const mimeType = item.mimeType;

		if (mimeType === "application/pdf" || mimeType?.startsWith("image/")) {
			setViewerFile({ url, name: item.fileName ?? "", mimeType });
			setIsViewerOpen(true);
		} else {
			// ponytail: non-pdf/image langsung download tanpa viewer
			window.open(url, "_blank");
		}
	};

	if (!ref || !refId) return null;

	const lampiran = (lampiranQuery.data as LampiranSkQuery[]) ?? [];

	return (
		<div className="rounded-lg border bg-card shadow-sm mt-4">
			<div className="flex items-center justify-between px-4 py-3 border-b">
				<h3 className="text-sm font-semibold text-foreground">Lampiran {skLabel ? `— SK ${skLabel}` : ""}</h3>
			</div>

			{/* Upload area */}
			<div className="px-4 py-3 border-b space-y-2">
				<div className="flex items-end gap-2">
					<div className="flex-1 space-y-1">
						<Label className="text-xs text-muted-foreground">Pilih file</Label>
						<input
							ref={fileRef}
							type="file"
							className="block w-full text-sm text-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<Input
						placeholder="Keterangan (opsional)"
						value={uploadNotes}
						onChange={(e) => setUploadNotes(e.target.value)}
						className="h-9 text-sm flex-1"
					/>
					<Button size="sm" onClick={handleUpload} disabled={isUploading || !fileRef.current?.files?.[0]}>
						{isUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
						{isUploading ? "Mengunggah…" : "Unggah"}
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				{lampiranQuery.isPending ? (
					<div className="flex items-center justify-center py-8">
						<Loader2 className="size-5 animate-spin text-muted-foreground" />
					</div>
				) : lampiran.length === 0 ? (
					<div className="py-8 text-center text-sm text-muted-foreground">No Data</div>
				) : (
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
								<th className="px-4 py-2 text-left w-10">No</th>
								<th className="px-4 py-2 text-left">File</th>
								<th className="px-4 py-2 text-left">Keterangan</th>
								<th className="px-4 py-2 text-right w-20">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{lampiran.map((item, i) => (
								<tr key={item.id ?? i} className="border-b last:border-b-0 hover:bg-row-hover transition-colors">
									<td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
									<td className="px-4 py-2 text-foreground font-medium">{item.fileName ?? "—"}</td>
									<td className="px-4 py-2 text-muted-foreground">{item.notes ?? "—"}</td>
									<td className="px-4 py-2 text-right">
										<div className="inline-flex items-center gap-1">
											<Button variant="ghost" size="icon" title="Lihat" onClick={() => handleView(item)}>
												<Eye className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												title="Hapus"
												onClick={() => setDeleteId(String(item.id ?? ""))}
											>
												<Trash2 className="size-4 text-destructive" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Viewer modal (pdf/image only) */}
			{isViewerOpen && viewerFile && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
					<div className="relative max-w-3xl max-h-[90vh] w-full h-full bg-card rounded-lg overflow-auto">
						<button
							type="button"
							onClick={() => setIsViewerOpen(false)}
							className="sticky top-2 z-10 float-right mr-2 mt-2 rounded-md bg-card px-3 py-1 text-sm font-medium shadow-md hover:bg-accent"
						>
							Tutup
						</button>
						{viewerFile.mimeType?.startsWith("image/") ? (
							<img src={viewerFile.url} alt={viewerFile.name} className="w-full h-auto" />
						) : (
							<iframe src={viewerFile.url} className="w-full h-[85vh]" title={viewerFile.name} />
						)}
					</div>
				</div>
			)}

			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="lampiran"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</div>
	);
}
