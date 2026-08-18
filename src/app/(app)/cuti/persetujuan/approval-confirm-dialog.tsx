"use client";

import { CheckCheck, X } from "lucide-react";
import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ApprovalAction = "APPROVE" | "REJECT";

interface ApprovalConfirmDialogProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	action: ApprovalAction;
	pegawaiNama: string;
	onConfirm: (notes: string) => void;
	isPending: boolean;
	error?: string | null;
}

/** Satu dialog untuk Setujui/Tolak — notes WAJIB untuk kedua aksi (CU-12). */
export function ApprovalConfirmDialog({
	open,
	onOpenChange,
	action,
	pegawaiNama,
	onConfirm,
	isPending,
	error,
}: ApprovalConfirmDialogProps) {
	const [notes, setNotes] = useState("");

	const isApprove = action === "APPROVE";
	const title = isApprove ? "Setujui Pengajuan Cuti" : "Tolak Pengajuan Cuti";

	return (
		<AlertDialog
			open={open}
			onOpenChange={(v) => {
				if (!isPending) {
					setNotes("");
					onOpenChange(v);
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						{isApprove ? <CheckCheck className="size-4 text-success" /> : <X className="size-4 text-destructive" />}
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{isApprove ? "Setujui" : "Tolak"} pengajuan cuti {pegawaiNama}? Catatan wajib diisi untuk{" "}
						{isApprove ? "persetujuan" : "penolakan"} ini.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="space-y-1.5">
					<Label className="text-sm font-medium">
						Catatan <span className="text-destructive">*</span>
					</Label>
					<Textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						className="min-h-24"
						placeholder="Alasan / catatan persetujuan"
						aria-invalid={!notes.trim()}
					/>
				</div>
				{error && <p className="text-sm text-destructive">{error}</p>}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
					<AlertDialogAction
						variant={isApprove ? "default" : "destructive"}
						disabled={!notes.trim() || isPending}
						onClick={() => onConfirm(notes.trim())}
					>
						{isPending ? "Memproses..." : isApprove ? "Setujui" : "Tolak"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
