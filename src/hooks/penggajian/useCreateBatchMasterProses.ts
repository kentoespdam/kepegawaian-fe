import { useMutation } from "@tanstack/react-query";

export function useCreateBatchMasterProses() {
	return useMutation({
		mutationFn: async (data: { batchMasterId: number; nama: string; jenisGaji: string; nilai: number }) => {
			const res = await fetch("/api/proxy/penggajian/batch/master/proses", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}
		},
	});
}
