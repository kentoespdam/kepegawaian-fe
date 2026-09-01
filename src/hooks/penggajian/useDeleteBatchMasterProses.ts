import { useMutation } from "@tanstack/react-query";

export function useDeleteBatchMasterProses() {
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
	});
}
