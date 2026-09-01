import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";

export function useCreateBatch() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			tahun: string;
			bulan: string;
			diProsesOleh: string;
			jabatanPemroses: string;
			file?: File;
		}) => {
			const formData = new FormData();
			formData.append("tahun", data.tahun);
			formData.append("bulan", data.bulan);
			formData.append("diProsesOleh", data.diProsesOleh);
			formData.append("jabatanPemroses", data.jabatanPemroses);
			if (data.file) {
				formData.append("fileName", data.file);
			}

			const res = await fetch("/api/proxy/penggajian/batch", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `HTTP ${res.status}`);
			}

			const body = (await res.json()) as { data: GajiBatchRootResponse };
			return body.data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() });
		},
	});
}
