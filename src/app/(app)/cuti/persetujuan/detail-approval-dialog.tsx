"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, CircleX, Clock, Eye, History, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { approvalStatusTone, labelApprovalStatus } from "@/lib/enum-labels";
import { apiErrorMessage, cn, formatDate, throwIfNotOk } from "@/lib/utils";
import type { CutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse } from "@/types/cuti/approval";
import type { CutiApprovalChainResponse } from "@/types/cuti/pengajuan";

type ApprovalAction = "APPROVE" | "REJECT";

interface DetailApprovalDialogProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	row: CutiApprovalChainResponse | null;
	pegawaiId: number | null;
	onActionComplete: () => void;
}

function StatusBadge({ status }: { status?: string }) {
	if (!status) return <span className="text-muted-foreground">—</span>;
	const iconMap: Record<string, typeof Clock> = {
		PENDING: Clock,
		APPROVED: CircleCheck,
		CONFIRMED: CircleCheck,
		REJECTED: CircleX,
	};
	const Icon = iconMap[status] ?? Clock;
	return (
		<Badge variant="outline" className={cn("gap-1", approvalStatusTone(status))}>
			<Icon className="size-3" />
			{labelApprovalStatus(status)}
		</Badge>
	);
}

function DetailTab({ row }: { row: CutiApprovalChainResponse }) {
	const c = row.refCuti;
	return (
		<div className="space-y-4">
			<div>
				<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Informasi Pegawai</h4>
				<dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
					<dt className="text-muted-foreground">Nama</dt>
					<dd className="font-medium">{c?.nama ?? "—"}</dd>
					<dt className="text-muted-foreground">NIPAM</dt>
					<dd className="font-medium">{c?.nipam ?? "—"}</dd>
					<dt className="text-muted-foreground">Jabatan</dt>
					<dd className="font-medium">{c?.jabatan?.nama ?? "—"}</dd>
					<dt className="text-muted-foreground">Organisasi</dt>
					<dd className="font-medium">{c?.organisasi?.nama ?? "—"}</dd>
				</dl>
			</div>
			<Separator />
			<div>
				<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Detail Cuti</h4>
				<dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
					<dt className="text-muted-foreground">Jenis Cuti</dt>
					<dd className="font-medium">
						{c?.jenisCuti?.nama ?? "—"}
						{c?.subJenisCuti?.nama && <span className="text-muted-foreground ml-1">/ {c.subJenisCuti.nama}</span>}
					</dd>
					<dt className="text-muted-foreground">Periode</dt>
					<dd className="font-medium">
						{formatDate(c?.tanggalMulai)} – {formatDate(c?.tanggalSelesai)}
					</dd>
					<dt className="text-muted-foreground">Jumlah Hari</dt>
					<dd className="font-medium">{c?.jumlahHari ?? "—"}</dd>
					<dt className="text-muted-foreground">Hari Kerja</dt>
					<dd className="font-medium">{c?.jumlahHariKerja ?? "—"}</dd>
					<dt className="text-muted-foreground">Status</dt>
					<dd>
						<StatusBadge status={c?.approvalCutiStatus} />
					</dd>
				</dl>
			</div>
			{c?.alasan && (
				<>
					<Separator />
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Alasan</h4>
						<p className="text-sm whitespace-pre-wrap">{c.alasan}</p>
					</div>
				</>
			)}
		</div>
	);
}

function RiwayatTab({ cutiId }: { cutiId: number }) {
	const q = useQuery({
		queryKey: ["cuti-approval-history", cutiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/cuti/approval/${cutiId}?size=100`);
			throwIfNotOk(res, "Gagal memuat riwayat approval");
			const body = (await res.json()) as PageResultPageCutiApprovalMiniResponse;
			return body.data?.content ?? [];
		},
		enabled: cutiId > 0,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	if (q.isPending) {
		return (
			<div className="flex items-center justify-center py-8 text-muted-foreground">
				<Loader2 className="size-4 animate-spin mr-2" />
				Memuat riwayat...
			</div>
		);
	}

	if (q.isError) {
		return (
			<div className="text-center py-8 text-sm text-destructive">
				Gagal memuat riwayat.{" "}
				<button type="button" onClick={() => q.refetch()} className="underline">
					Coba lagi
				</button>
			</div>
		);
	}

	const items = q.data as CutiApprovalMiniResponse[];
	if (items.length === 0) {
		return <div className="text-center py-8 text-sm text-muted-foreground">Belum ada riwayat approval</div>;
	}

	return (
		<div className="space-y-0">
			{items.map((item, i) => (
				<div key={item.id ?? i} className="flex gap-3 py-3">
					<div className="flex flex-col items-center">
						<div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
							{item.approvalLevel ?? i + 1}
						</div>
						{i < items.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
					</div>
					<div className="flex-1 min-w-0 space-y-1">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-sm font-medium">{item.approver?.nama ?? "—"}</span>
							<span className="text-xs text-muted-foreground">{item.jabatan?.nama}</span>
							<StatusBadge status={item.approvalStatus} />
						</div>
						{item.notes && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.notes}</p>}
						{item.createdAt && <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>}
					</div>
				</div>
			))}
		</div>
	);
}

export function DetailApprovalDialog({
	open,
	onOpenChange,
	row,
	pegawaiId,
	onActionComplete,
}: DetailApprovalDialogProps) {
	const qc = useQueryClient();
	const [activeTab, setActiveTab] = useState<"detail" | "riwayat">("detail");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState<string | null>(null);

	const isWritable = row?.readWriteStatus === "WRITE";
	const isPending = row?.refCuti?.approvalCutiStatus === "PENDING";
	const canAct = isWritable && isPending;

	const resetState = () => {
		setActiveTab("detail");
		setNotes("");
		setError(null);
	};

	const handleClose = (v: boolean) => {
		if (!v) resetState();
		onOpenChange(v);
	};

	const mutate = useMutation({
		mutationFn: async (action: ApprovalAction) => {
			if (!row) return;
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };
			const body = {
				csrfToken: csrfBody.data ?? "",
				cutiId: row.refCuti?.id ?? 0,
				approverId: pegawaiId,
				approvalLevel: row.approvalLevel ?? 1,
				approvalStatus: action === "APPROVE" ? "APPROVED" : "REJECTED",
				notes: notes.trim(),
			};
			const res = await fetch("/api/proxy/cuti/approval", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal memproses persetujuan"));
			}
		},
		onSuccess: async (_data, action) => {
			toast.success(action === "APPROVE" ? "Pengajuan disetujui" : "Pengajuan ditolak");
			resetState();
			await Promise.all([
				qc.invalidateQueries({ queryKey: ["cuti-persetujuan"] }),
				qc.invalidateQueries({ queryKey: ["cuti-pengajuan"] }),
				qc.invalidateQueries({ queryKey: ["cuti-kuota"] }),
			]);
			onActionComplete();
		},
		onError: (e: Error) => setError(e.message),
	});

	if (!row) return null;

	const cutiId = row.refCuti?.id ?? 0;

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="min-w-2xl max-h-screen" showCloseButton>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Eye className="size-4" />
						Detail Pengajuan Cuti
					</DialogTitle>
					<DialogDescription>
						{row.refCuti?.nama} — {row.refCuti?.jenisCuti?.nama}
					</DialogDescription>
				</DialogHeader>

				{/* Tabs */}
				<div className="flex gap-1 border-b">
					<button
						type="button"
						onClick={() => setActiveTab("detail")}
						className={cn(
							"px-3 py-2 text-sm font-medium -mb-px transition-colors",
							activeTab === "detail"
								? "border-b-2 border-primary text-foreground"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						Detail
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("riwayat")}
						className={cn(
							"px-3 py-2 text-sm font-medium -mb-px transition-colors inline-flex items-center gap-1.5",
							activeTab === "riwayat"
								? "border-b-2 border-primary text-foreground"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						<History className="size-3.5" />
						Riwayat
					</button>
				</div>

				{/* Tab content */}
				<div className="max-h-[50vh] overflow-y-auto py-2">
					{activeTab === "detail" ? <DetailTab row={row} /> : <RiwayatTab cutiId={cutiId} />}
				</div>

				{/* Footer: notes + action buttons */}
				{canAct ? (
					<DialogFooter className="block!">
						<div className="space-y-2">
							<Label className="text-sm font-medium">Catatan</Label>
							<Textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								className="min-h-20"
								placeholder="Catatan untuk pengaju..."
								required
							/>
							{error && <p className="text-sm text-destructive">{error}</p>}
							<div className="flex gap-2 justify-end">
								<Button
									variant="outline"
									size="sm"
									className="text-destructive hover:text-destructive hover:border-destructive/50"
									disabled={mutate.isPending}
									onClick={() => mutate.mutate("REJECT")}
								>
									<CircleX className="size-3.5 mr-1" />
									Tolak
								</Button>
								<Button size="sm" disabled={mutate.isPending} onClick={() => mutate.mutate("APPROVE")}>
									<CircleCheck className="size-3.5 mr-1" />
									Setujui
								</Button>
							</div>
						</div>
					</DialogFooter>
				) : (
					<DialogFooter>
						<DialogClose render={<Button variant="outline" size="sm" />}>Tutup</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
