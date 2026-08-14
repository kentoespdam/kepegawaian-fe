"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader2, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { LampiranUploadModal } from "@/components/lampiran-upload-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Dynamic import — react-pdf butuh browser API, jangan di-SSR
const PdfViewer = dynamic(() => import("@/components/pdf-viewer").then((m) => m.PdfViewer), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center py-20">
			<Loader2 className="size-8 animate-spin text-muted-foreground" />
		</div>
	),
});

/** Minimal item shape dari endpoint list. */
interface LampiranItem {
	id?: number | string;
	fileName?: string;
	mimeType?: string;
	notes?: string;
}

export interface LampiranCardProps {
	/** Judul header card. */
	title?: string;

	/** Entity reference type (e.g. `"SK_MUTASI"` or `"PROFIL_PENDIDIKAN"`). */
	ref: string;

	/** Entity reference ID. */
	refId: string | number;

	/** TanStack Query key prefix — cache & invalidasi. */
	queryKey: readonly string[];

	/** URL GET daftar lampiran. */
	listUrl: string;

	/** URL POST upload (FormData). */
	uploadUrl: string;

	/** Build URL hapus by ID. */
	deleteUrl: (id: string | number) => string;

	/** Build URL view file by ID. */
	viewUrl: (id: string | number) => string;

	/** Label item untuk dialog hapus. Default: "lampiran". */
	itemLabel?: string;

	/** Sembunyikan tombol upload. */
	hideUpload?: boolean;

	/** Sembunyikan tombol hapus (RBAC view-only). */
	hideDelete?: boolean;
}

export function LampiranCard({
	title = "Lampiran",
	ref,
	refId,
	queryKey,
	listUrl,
	uploadUrl,
	deleteUrl,
	viewUrl,
	itemLabel = "lampiran",
	hideUpload = false,
	hideDelete = false,
}: LampiranCardProps) {
	const qc = useQueryClient();
	const [uploadOpen, setUploadOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [viewerFile, setViewerFile] = useState<{
		url: string;
		name: string;
		mimeType?: string;
	} | null>(null);

	const lampiranQuery = useQuery({
		queryKey: [...queryKey, ref, refId],
		queryFn: async () => {
			const res = await fetch(listUrl); // BE balikin 404 "Data not found!" saat list kosong — jangan throw, biar
			// refetch pasca-hapus item terakhir tak menyisakan baris stale (keepPreviousData).
			if (res.status === 404) return [];
			if (!res.ok) throw new Error("Gagal memuat lampiran");
			const body = (await res.json()) as {
				data?: LampiranItem[];
			};
			return body.data ?? [];
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(deleteUrl(deleteId), { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Lampiran berhasil dihapus");
			qc.invalidateQueries({ queryKey: [...queryKey, ref, refId] });
			setDeleteId(null);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Terjadi kesalahan";
			setDeleteError(message);
			throw e;
		}
	};

	const handleView = (item: LampiranItem) => {
		const url = viewUrl(item.id ?? "");
		const mimeType = item.mimeType;

		if (mimeType === "application/pdf" || mimeType?.startsWith("image/")) {
			setViewerFile({ url, name: item.fileName ?? "", mimeType });
			setIsViewerOpen(true);
		} else {
			// ponytail: non-pdf/image langsung download via new tab
			window.open(url, "_blank");
		}
	};

	const lampiran = lampiranQuery.data;

	return (
		<>
			<div className="rounded-lg border bg-card shadow-sm">
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<h3 className="text-sm font-semibold text-foreground">{title}</h3>
					{!hideUpload && (
						<Button size="sm" onClick={() => setUploadOpen(true)}>
							<Plus className="size-3.5" />
							Unggah
						</Button>
					)}
				</div>

				{/* Daftar lampiran */}
				<div className="overflow-x-auto">
					{lampiranQuery.isPending ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="size-5 animate-spin text-muted-foreground" />
						</div>
					) : !lampiran || lampiran.length === 0 ? (
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
												{!hideDelete && (
													<Button
														variant="ghost"
														size="icon"
														title="Hapus"
														onClick={() => setDeleteId(String(item.id ?? ""))}
													>
														<Trash2 className="size-4 text-destructive" />
													</Button>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>

			{/* Upload modal */}
			<LampiranUploadModal
				open={uploadOpen}
				onOpenChange={setUploadOpen}
				ref={ref}
				refId={refId}
				queryKey={queryKey}
				uploadUrl={uploadUrl}
			/>

			{/* Viewer modal (pdf/image only) */}
			<Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
				<DialogContent className="sm:max-w-4xl p-0 gap-0 max-h-[85dvh] overflow-hidden flex flex-col">
					{viewerFile?.mimeType?.startsWith("image/") ? (
						<div className="relative w-full max-h-[85vh] overflow-auto">
							{" "}
							{/* biome-ignore lint/performance/noImgElement: dynamic upload, use img not next/Image */}
							<img src={viewerFile.url} alt={viewerFile.name} className="w-full h-auto" />
						</div>
					) : viewerFile ? (
						<PdfViewer url={viewerFile.url} fileName={viewerFile.name} />
					) : null}
				</DialogContent>
			</Dialog>

			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel={itemLabel}
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
