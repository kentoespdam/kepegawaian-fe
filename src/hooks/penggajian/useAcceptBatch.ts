import { useMutation, useQueryClient } from "@tanstack/react-query";
import { batchKeys } from "./useBatchList";

export function useAcceptBatch(batchId: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/${batchId}/accept`, { method: "PATCH" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: batchKeys.all }),
	});
}
