import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import type { GajiBatchRootProcessRequest } from "@/types/penggajian/batch";

/**
 * Generic factory for batch PATCH mutations.
 * Replaces useVerify2, useAcceptBatch, useReprocessBatch, useKirimSlipGaji.
 *
 * @param urlSuffix — path after `/penggajian/batch/`, including the batch root ID, e.g. `"abc/verify2"` or `"master/upload/abc"`
 */
export function useBatchAction<TData = GajiBatchRootProcessRequest>(urlSuffix: string) {
	const qc = useQueryClient();
	return useMutation<void, Error, TData | void>({
		mutationFn: async (data?: TData | void) => {
			const res = await fetch(`/api/proxy/penggajian/batch/${urlSuffix}`, {
				method: "PATCH",
				headers: data ? { "Content-Type": "application/json" } : undefined,
				body: data ? JSON.stringify(data) : undefined,
			});
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
		mutationFn: async (input: string | { id: string; data?: GajiBatchRootProcessRequest }) => {
			const id = typeof input === "string" ? input : input.id;
			const data = typeof input === "string" ? { id } : (input.data ?? { id });
			const res = await fetch(`/api/proxy/penggajian/batch/${id}/reprocess`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() }),
	});
}
