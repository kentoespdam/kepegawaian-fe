"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";

export function useRollbackBatch(batchId: string, onRefetch: () => void, onClose: () => void) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${batchId}/rollback`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `Gagal membatalkan perubahan (${res.status})`);
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() });
			toast.success("Semua perubahan potongan & tambahan berhasil dibatalkan");
			onRefetch();
			onClose();
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal membatalkan perubahan");
		},
	});
}
