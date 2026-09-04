"use client";

import { Loader2, RefreshCw } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { useReprocessBatch } from "@/hooks/penggajian/useBatchAction";

interface ReprocessButtonProps {
	batchId: string;
	/** Label tombol. Default: "Proses Ulang" */
	label?: string;
	/** Judul dialog konfirmasi. Default: "Proses Ulang Batch" */
	confirmTitle?: string;
	/** Deskripsi dialog konfirmasi. */
	confirmDescription?: ReactNode;
	/** Label tombol konfirmasi di dalam dialog. Default: "Ya, {label}" */
	confirmActionLabel?: string;
	/** Nonaktifkan tombol (tambahan dari loading state internal). */
	disabled?: boolean;
	/** Dipanggil setelah mutasi berhasil. */
	onSuccess?: () => void;
	/** Icon kustom. Default: RefreshCw */
	icon?: ComponentType<{ className?: string }>;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	title?: string;
	className?: string;
}

/**
 * Tombol proses ulang batch penggajian — self-contained dengan AlertDialog baked-in.
 * Memanggil PATCH /penggajian/batch/{batchId}/reprocess — BE yang tentukan rollback target.
 * Payload minimal: hanya { id } — tidak perlu nama/jabatan/phase.
 */
export function ReprocessButton({
	batchId,
	label = "Proses Ulang",
	confirmTitle = "Proses Ulang Batch",
	confirmDescription,
	confirmActionLabel,
	disabled,
	onSuccess,
	icon: Icon = RefreshCw,
	variant = "destructive",
	size = "sm",
	title,
	className,
}: ReprocessButtonProps) {
	const [open, setOpen] = useState(false);
	const reprocess = useReprocessBatch();

	const handleConfirm = async () => {
		try {
			await reprocess.mutateAsync(batchId);
			toast.success("Batch berhasil diproses ulang");
			setOpen(false);
			onSuccess?.();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal memproses ulang batch");
		}
	};

	const isIconOnly = size === "icon";
	const effectiveConfirmAction = confirmActionLabel ?? `Ya, ${label}`;

	return (
		<>
			<Button
				variant={variant}
				size={size}
				title={title}
				aria-label={title ?? label}
				onClick={() => setOpen(true)}
				disabled={disabled || reprocess.isPending || !batchId}
				className={className ?? (isIconOnly ? undefined : "h-8 text-xs font-semibold gap-1.5")}
			>
				{reprocess.isPending ? (
					<Loader2 className={isIconOnly ? "size-4 animate-spin" : "size-3.5 animate-spin"} />
				) : (
					<Icon className={isIconOnly ? "size-4" : "size-3.5"} />
				)}
				{!isIconOnly && label}
			</Button>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
						{confirmDescription && <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={reprocess.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirm}
							disabled={reprocess.isPending}
							className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
						>
							{reprocess.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							{effectiveConfirmAction}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
