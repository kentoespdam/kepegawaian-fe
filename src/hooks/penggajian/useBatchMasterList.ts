import { useQuery } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";

export function useBatchMasterList(periode: string) {
	return useQuery<GajiBatchMasterResponse[]>({
		queryKey: penggajianKeys.batch.master(periode),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?periode=${periode}`);
			throwIfNotOk(res, "Gagal memuat daftar pegawai");
			const body = (await res.json()) as {
				data?: GajiBatchMasterResponse[] | { content?: GajiBatchMasterResponse[] };
				content?: GajiBatchMasterResponse[];
			};
			const raw = body.data ?? body;
			const items = Array.isArray(raw) ? raw : (raw?.content ?? []);
			return items as GajiBatchMasterResponse[];
		},
		enabled: !!periode,
		staleTime: 30_000,
	});
}
