import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";

/**
 * Generic factory for batch PATCH mutations.
 * Replaces useVerify2, useAcceptBatch, useReprocessBatch, useKirimSlipGaji.
 *
 * @param batchId  — the batch root ID
 * @param urlSuffix — path after `/penggajian/batch/`, e.g. `"abc/verify2"` or `"master/upload/abc"`
 */
export function useBatchAction(batchId: string, urlSuffix: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/${urlSuffix}`, { method: "PATCH" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() }),
	});
}

export function useDeleteBatch() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/proxy/penggajian/batch/${id}`, { method: "DELETE" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() }),
	});
}

export function useReprocessBatch() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/proxy/penggajian/batch/${id}/reprocess`, { method: "PATCH" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() }),
	});
}

