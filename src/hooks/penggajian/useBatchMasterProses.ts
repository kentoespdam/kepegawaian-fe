import { useQuery } from "@tanstack/react-query";
import { throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse } from "@/types/penggajian/batch";

export function useBatchMasterProses(pegawaiId: string) {
	return useQuery<GajiBatchMasterProsesResponse[]>({
		queryKey: ["penggajian", "batch", "proses", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${pegawaiId}/master`);
			throwIfNotOk(res, "Gagal memuat tambahan komponen");
			const body = (await res.json()) as { data: GajiBatchMasterProsesResponse[] };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});
}
