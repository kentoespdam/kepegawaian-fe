"use client";

import { Loader2, ShieldCheck } from "lucide-react";
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
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";

interface VerifyButtonProps {
	batchId: string;
	nama?: string;
	jabatan?: string;
	/** Label tombol. Default: "Verifikasi" */
	label?: string;
	/** Judul dialog konfirmasi. Default: "Konfirmasi Verifikasi" */
	confirmTitle?: string;
	/** Deskripsi dialog konfirmasi. */
	confirmDescription?: ReactNode;
	/** Label tombol konfirmasi di dalam dialog. Default: "Ya, {label}" */
	confirmActionLabel?: string;
	/** Nonaktifkan tombol (tambahan dari loading state internal). */
	disabled?: boolean;
	/** Dipanggil setelah mutasi berhasil. */
	onSuccess?: () => void;
	/** Icon kustom. Default: ShieldCheck */
	icon?: ComponentType<{ className?: string }>;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	title?: string;
	className?: string;
}

/**
 * Tombol verifikasi batch penggajian — self-contained dengan AlertDialog baked-in.
 * Memanggil PATCH /penggajian/batch/{batchId}/verify (BE smart-detect phase).
 * Props `nama` + `jabatan` diisi dari session user (dipass dari server component).
 */
export function VerifyButton({
	batchId,
	nama,
	jabatan,
	label = "Verifikasi",
	confirmTitle = "Konfirmasi Verifikasi",
	confirmDescription,
	confirmActionLabel,
	disabled,
	onSuccess,
	icon: Icon = ShieldCheck,
	variant = "default",
	size = "sm",
	title,
	className,
}: VerifyButtonProps) {
	const [open, setOpen] = useState(false);
	const verify = useBatchAction(`${batchId}/verify`);

	const handleConfirm = async () => {
		try {
			await verify.mutateAsync({ id: batchId, nama, jabatan });
			toast.success(`${label} berhasil`);
			setOpen(false);
			onSuccess?.();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : `Gagal ${label.toLowerCase()}`);
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
				disabled={disabled || verify.isPending || !batchId}
				className={
					className ??
					(variant === "default"
						? "h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
						: undefined)
				}
			>
				{verify.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Icon className="size-3.5" />}
				{!isIconOnly && label}
			</Button>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
						{confirmDescription && <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={verify.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirm}
							disabled={verify.isPending}
							className="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							{verify.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							{effectiveConfirmAction}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
